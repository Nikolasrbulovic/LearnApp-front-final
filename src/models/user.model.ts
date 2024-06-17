export type UserBasicInfo = {
  userId: string
  firstName: string
  lastName: string
  username: string
  email: string
}

export type Trainer = UserBasicInfo & {
  role: 'trainer'
  specialization: {
    id: string
    specialization: string
  }
}

export type Student = UserBasicInfo & {
  role: 'student'
  dateOfBirth?: string
  address?: string
}

export type User = Trainer | Student
