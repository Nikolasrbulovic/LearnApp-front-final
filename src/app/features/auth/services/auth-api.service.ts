import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export class AuthApiService {
  private readonly authApiPath = 'http://localhost:3003/dev/auth'

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(`${this.authApiPath}/login`, {
      username,
      password,
    })
  }

  register({
    firstName,
    lastName,
    email,
    userType,
    specializationId,
    dateOfBirth,
    address,
  }: {
    firstName: string
    lastName: string
    email: string
    userType: string
    specializationId?: string
    dateOfBirth?: string
    address?: string
  }) {
    return this.http.post(`${this.authApiPath}/register`, {
      firstName,
      lastName,
      email,
      userType,
      specializationId,
      dateOfBirth,
      address,
    })
  }
}
