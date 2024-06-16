export type Training = {
  id?: string
  studentId: string
  trainerId: string
  name: string
  type: TrainingType
  date: string
  duration: number
  description?: string
}

export type TrainingType = {
  id: string
  type: string
}
