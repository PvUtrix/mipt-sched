
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings, Database, Users, Bell, Shield } from 'lucide-react'

export default function SettingsPage() {

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Настройки системы
        </h1>
        <p className="text-gray-600 mt-2">
          Управляйте настройками и конфигурацией SmartSchedule
        </p>
      </div>

      {/* Settings Sections */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2 text-blue-600" />
              База данных
            </CardTitle>
            <CardDescription>
              Управление данными системы и резервное копирование
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => alert('Функция экспорта данных будет реализована в следующей версии')}>
                Экспорт данных
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => alert('Функция импорта расписания будет реализована в следующей версии')}>
                Импорт расписания
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => alert('Кэш очищен успешно!')}>
                Очистить кэш
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-600" />
              Пользователи
            </CardTitle>
            <CardDescription>
              Управление пользователями и ролями
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => alert('Функция добавления администратора будет реализована в следующей версии')}>
                Добавить администратора
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => alert('Функция массового импорта студентов будет реализована в следующей версии')}>
                Массовый импорт студентов
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => alert('Функция управления ролями будет реализована в следующей версии')}>
                Управление ролями
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2 text-orange-600" />
              Уведомления
            </CardTitle>
            <CardDescription>
              Настройка системы уведомлений
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email уведомления</span>
                <Button variant="outline" size="sm" onClick={() => alert('Email уведомления включены')}>
                  Включить
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">SMS уведомления</span>
                <Button variant="outline" size="sm" onClick={() => alert('SMS уведомления пока не поддерживаются')}>
                  Отключено
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Напоминания о занятиях</span>
                <Button variant="outline" size="sm" onClick={() => alert('Напоминания о занятиях включены')}>
                  Включить
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-red-600" />
              Безопасность
            </CardTitle>
            <CardDescription>
              Настройки безопасности системы
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" onClick={() => alert('Функция изменения пароля будет реализована в следующей версии')}>
                Изменить пароль
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => alert('Функция настройки сессии будет реализована в следующей версии')}>
                Настройки сессии
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => alert('Функция журнала действий будет реализована в следующей версии')}>
                Журнал действий
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2 text-gray-600" />
            Информация о системе
          </CardTitle>
          <CardDescription>
            Основная информация о SmartSchedule
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">v1.0.0</div>
              <div className="text-sm text-gray-500">Версия системы</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">2025</div>
              <div className="text-sm text-gray-500">Год выпуска</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">Next.js</div>
              <div className="text-sm text-gray-500">Технология</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
