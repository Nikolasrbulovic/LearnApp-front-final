export type Training = {
  id?: string
  student: {
    fullName: string
  }
  trainer: {
    fullName: string
  }
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
