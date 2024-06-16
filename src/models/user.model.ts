export type UserBasicInfo = {
  userId: string
  firstName: string
  lastName: string
  username: string
  email: string
}

export type Trainer = UserBasicInfo & {
  userType: 'trainer'
  specialization: {
    id: string
    name: string
  }
}

export type Student = UserBasicInfo & {
  userType: 'student'
  dateOfBirth?: string
  address?: string
}

export type User = Trainer | Student
