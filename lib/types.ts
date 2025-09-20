export type Expense = {
  id: string
  amount: number
  category: string
  description: string
  date: Date
}

export type ExpenseFormData = Omit<Expense, 'id' | 'date'> & {
  date: string
}

export const EXPENSE_CATEGORIES = [
  'Food',
  'Transportation',
  'Housing',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Education',
  'Other'
] as const

export type DateRange = {
  from: Date | undefined
  to: Date | undefined
}

export type Schedule = {
  id: string
  subjectId: string
  groupId?: string | null
  subgroupId?: string | null
  date: Date
  dayOfWeek: number
  startTime: string
  endTime: string
  location?: string | null
  eventType?: string | null
  description?: string | null
  createdAt: Date
  updatedAt: Date
  subject?: {
    id: string
    name: string
  }
  group?: {
    id: string
    name: string
  }
}