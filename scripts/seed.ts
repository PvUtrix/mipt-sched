
import { PrismaClient } from '@prisma/client'
import bcryptjs from 'bcryptjs'
import fs from 'fs'
import path from 'path'

const prisma = new PrismaClient()

interface ExcelAnalysis {
  sheets: string[]
  data: {
    [key: string]: {
      shape: number[]
      columns: string[]
      sample_data: any[]
    }
  }
}

async function main() {
  try {
    console.log('🌱 Начинаем заполнение базы данных...')
    
    // Читаем анализ Excel файла
    const analysisPath = path.join(__dirname, '..', 'data', 'excel_analysis.json')
    const excelAnalysis: ExcelAnalysis = JSON.parse(fs.readFileSync(analysisPath, 'utf-8'))
    
    // 1. Создание тестовых пользователей
    console.log('👤 Создание пользователей...')
    
    // Админ пользователь
    const adminPassword = await bcryptjs.hash('admin123', 12)
    const admin = await prisma.user.upsert({
      where: { email: 'admin@smartschedule.com' },
      update: {},
      create: {
        email: 'admin@smartschedule.com',
        password: adminPassword,
        firstName: 'Администратор',
        lastName: 'Системы',
        name: 'Администратор Системы',
        role: 'admin',
      },
    })

    // Тестовый пользователь для системы
    const testPassword = await bcryptjs.hash('johndoe123', 12)
    const testUser = await prisma.user.upsert({
      where: { email: 'john@doe.com' },
      update: {},
      create: {
        email: 'john@doe.com',
        password: testPassword,
        firstName: 'John',
        lastName: 'Doe',
        name: 'John Doe',
        role: 'admin',
      },
    })

    // 2. Создание группы
    console.log('👥 Создание групп...')
    const techPredGroup = await prisma.group.upsert({
      where: { name: 'ТехПред МФТИ 2025-27' },
      update: {},
      create: {
        name: 'ТехПред МФТИ 2025-27',
        description: 'Магистратура Технологическое предпринимательство МФТИ 2025-27',
        semester: '1 семестр',
        year: '2025-27',
      },
    })

    // 3. Создание предметов на основе Excel данных
    console.log('📚 Создание предметов...')
    const subjects = [
      {
        name: 'Проектирование венчурного предприятия (Тьюториал)',
        instructor: 'Чикин В.Н., Бахчиев А.В.',
        description: 'Тьюториал по проектированию венчурного предприятия'
      },
      {
        name: 'Научный семинар',
        instructor: 'Буренин А.В.',
        description: 'Научный семинар с распределением на микро-группы'
      },
      {
        name: 'Системное мышление',
        instructor: 'Бухарин М.А., Бодров В.К.',
        description: 'Развитие системного мышления'
      },
      {
        name: 'Коммерциализация R&D',
        instructor: 'Антонец В.А., Буренин А.Г.',
        description: 'Коммерциализация исследований и разработок'
      },
      {
        name: 'Основы финансового моделирования',
        instructor: 'Чернова М.А.',
        description: 'Основы финансового моделирования'
      },
      {
        name: 'Разработка продукта',
        instructor: 'Николаев А.В.',
        description: 'Методология разработки продукта'
      },
      {
        name: 'Общеинститутские мероприятия',
        instructor: 'МФТИ',
        description: 'Административные и общеинститутские мероприятия'
      }
    ]

    const createdSubjects = []
    for (const subject of subjects) {
      const createdSubject = await prisma.subject.upsert({
        where: { name: subject.name },
        update: {},
        create: subject,
      })
      createdSubjects.push(createdSubject)
    }

    // 4. Создание студентов на основе данных распределения
    console.log('🎓 Создание студентов...')
    const studentsData = excelAnalysis.data['1 семестр. Распределение на под'].sample_data
    
    const students = []
    for (const studentData of studentsData) {
      if (studentData?.Студент) {
        const names = studentData.Студент.split(' ')
        const firstName = names[1] || 'Студент'
        const lastName = names[0] || 'Неизвестный'
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@student.mipt.ru`.replace(/[^a-z0-9@.]/g, '')
        
        const studentPassword = await bcryptjs.hash('student123', 12)
        const student = await prisma.user.upsert({
          where: { email },
          update: {},
          create: {
            email,
            password: studentPassword,
            firstName,
            lastName,
            name: studentData.Студент,
            role: 'student',
            groupId: techPredGroup.id,
          },
        })
        
        // Создание записи о распределении по подгруппам
        await prisma.userGroup.upsert({
          where: { 
            userId_groupId: {
              userId: student.id,
              groupId: techPredGroup.id
            }
          },
          update: {},
          create: {
            userId: student.id,
            groupId: techPredGroup.id,
            subgroupCommerce: studentData.Коммерциализация,
            subgroupTutorial: studentData.Тьюториал,
            subgroupFinance: studentData['Финансовое моделирование'],
            subgroupSystemThinking: studentData['Системное мышление'],
          },
        })
        
        students.push(student)
      }
    }

    // 5. Создание расписания на основе Excel данных
    console.log('📅 Создание расписания...')
    const scheduleData = excelAnalysis.data['1 семестр. Расписание'].sample_data
    
    for (let i = 7; i < scheduleData.length; i++) { // Начинаем с 7-й записи, где начинаются реальные данные
      const row = scheduleData[i]
      if (row?.['Проектирование венчурного предприятия (Тьюториал)/ Чикин В.Н., Бахчиев А.В.'] && 
          typeof row['Проектирование венчурного предприятия (Тьюториал)/ Чикин В.Н., Бахчиев А.В.'] === 'string' &&
          row['Проектирование венчурного предприятия (Тьюториал)/ Чикин В.Н., Бахчиев А.В.'].includes('2025')) {
        
        const dateStr = row['Проектирование венчурного предприятия (Тьюториал)/ Чикин В.Н., Бахчиев А.В.']
        const dayOfWeek = row['Unnamed: 1']
        const time = row['Unnamed: 2']
        const eventName = row['Подгруппа 1']
        const location = row['Unnamed: 19']
        
        if (dateStr && eventName && time) {
          try {
            const eventDate = new Date(dateStr)
            if (!isNaN(eventDate.getTime())) {
              // Определяем предмет по названию события
              let subject = createdSubjects.find(s => s.name.includes('Общеинститутские'))
              if (eventName.includes('семинар')) {
                subject = createdSubjects.find(s => s.name.includes('Научный семинар'))
              } else if (eventName.includes('Fest Tech')) {
                subject = createdSubjects.find(s => s.name.includes('Общеинститутские'))
              }
              
              if (subject) {
                const [startTime, endTime] = time.includes('-') ? time.split('-') : [time, time]
                
                await prisma.schedule.create({
                  data: {
                    subjectId: subject.id,
                    groupId: techPredGroup.id,
                    date: eventDate,
                    dayOfWeek: typeof dayOfWeek === 'number' ? dayOfWeek : eventDate.getDay(),
                    startTime: startTime?.trim() || '09:00',
                    endTime: endTime?.trim() || '18:00',
                    location: location || 'Не указано',
                    eventType: 'seminar',
                    description: eventName,
                  },
                })
              }
            }
          } catch (error) {
            console.log(`Пропущена запись: ${error}`)
          }
        }
      }
    }

    // 6. Добавление дополнительных тестовых расписаний
    console.log('📋 Добавление дополнительных занятий...')
    const additionalSchedules = [
      {
        subject: createdSubjects.find(s => s.name.includes('Системное мышление')),
        date: new Date('2025-09-15'),
        startTime: '10:00',
        endTime: '12:00',
        location: 'Аудитория 301',
        description: 'Лекция по системному мышлению'
      },
      {
        subject: createdSubjects.find(s => s.name.includes('Коммерциализация')),
        date: new Date('2025-09-16'),
        startTime: '14:00',
        endTime: '16:00',
        location: 'Аудитория 205',
        description: 'Практикум по коммерциализации'
      },
      {
        subject: createdSubjects.find(s => s.name.includes('финансового моделирования')),
        date: new Date('2025-09-17'),
        startTime: '11:00',
        endTime: '13:00',
        location: 'Компьютерный класс',
        description: 'Практикум по финансовому моделированию'
      }
    ]

    for (const schedule of additionalSchedules) {
      if (schedule.subject) {
        await prisma.schedule.create({
          data: {
            subjectId: schedule.subject.id,
            groupId: techPredGroup.id,
            date: schedule.date,
            dayOfWeek: schedule.date.getDay(),
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            location: schedule.location,
            eventType: 'lecture',
            description: schedule.description,
          },
        })
      }
    }

    console.log('✅ Заполнение базы данных завершено!')
    console.log(`📊 Создано:
    - Пользователей: ${students.length + 2}
    - Групп: 1
    - Предметов: ${createdSubjects.length}
    - Расписаний: добавлены из Excel файла + дополнительные`)
    
  } catch (error) {
    console.error('❌ Ошибка при заполнении базы данных:', error)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
