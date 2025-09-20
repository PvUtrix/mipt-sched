
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Calendar, Users, BookOpen, Clock, ArrowRight, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  if (session) {
    if (session.user.role === 'admin') {
      redirect('/admin')
    } else {
      redirect('/student')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-white" />
              <h1 className="text-2xl font-bold text-white">SmartSchedule</h1>
            </div>
            <div className="space-x-4">
              <Button asChild variant="ghost" className="text-white hover:bg-white/20">
                <Link href="/login">Войти</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-6xl">
          <div className="fade-in-up">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Умное управление
              <span className="block text-yellow-300">расписанием</span>
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Современная система для университетов, позволяющая эффективно управлять расписаниями, группами и учебным процессом
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                <Link href="/login" className="flex items-center">
                  Начать работу
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Возможности системы
            </h3>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Все необходимые инструменты для эффективного управления учебным процессом
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white card-hover">
              <CardHeader className="text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-blue-300" />
                <CardTitle className="text-lg">Календарь расписания</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 text-center">
                  Удобный календарный вид с возможностью переключения между разными форматами отображения
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white card-hover">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-green-300" />
                <CardTitle className="text-lg">Управление группами</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 text-center">
                  Создание и редактирование групп студентов, назначение в подгруппы для разных предметов
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white card-hover">
              <CardHeader className="text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-purple-300" />
                <CardTitle className="text-lg">База предметов</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 text-center">
                  Полная информация о предметах, преподавателях и учебных материалах
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white card-hover">
              <CardHeader className="text-center">
                <Clock className="h-12 w-12 mx-auto mb-4 text-orange-300" />
                <CardTitle className="text-lg">Гибкое расписание</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-white/70 text-center">
                  Создание сложных расписаний с учетом подгрупп, аудиторий и особых событий
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="fade-in-up">
              <div className="text-4xl md:text-5xl font-bold text-yellow-300 mb-2 count-up">
                100+
              </div>
              <p className="text-lg text-white/80">Студентов в системе</p>
            </div>
            <div className="fade-in-up">
              <div className="text-4xl md:text-5xl font-bold text-yellow-300 mb-2 count-up">
                20+
              </div>
              <p className="text-lg text-white/80">Предметов в базе</p>
            </div>
            <div className="fade-in-up">
              <div className="text-4xl md:text-5xl font-bold text-yellow-300 mb-2 count-up">
                99%
              </div>
              <p className="text-lg text-white/80">Точность расписания</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Готовы начать?
          </h3>
          <p className="text-lg text-white/70 mb-8">
            Присоединяйтесь к SmartSchedule и оптимизируйте управление расписанием уже сегодня
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
            <Link href="/login" className="flex items-center">
              Войти в систему
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/20">
        <div className="container mx-auto px-4 text-center max-w-6xl">
          <p className="text-white/60">
            © 2025 SmartSchedule. Система управления университетскими расписаниями.
          </p>
        </div>
      </footer>
    </div>
  )
}
