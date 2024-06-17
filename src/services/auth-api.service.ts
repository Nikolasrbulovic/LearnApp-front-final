import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'
import { UserService } from './user.service'

@Injectable()
export class AuthApiService {
  private baseApiUrl = environment.baseApiUrl
  private localStorage: Storage = localStorage

  constructor(private http: HttpClient, private userService: UserService) {}

  login(username: string, password: string) {
    return this.http.post<{ authToken: string }>(
      `${this.baseApiUrl}/auth/login`,
      {
        username,
        password,
      }
    )
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
    console.log('asd')
    return this.http.post<{
      username: string
      password: string
      authToken: string
    }>(`${this.baseApiUrl}/auth/register`, {
      firstName,
      lastName,
      email,
      userType,
      specializationId,
      dateOfBirth,
      address,
    })
    console.log('asd1')
  }

  logout() {
    this.localStorage.removeItem('authToken')
    this.userService.clearUser()
  }
}
