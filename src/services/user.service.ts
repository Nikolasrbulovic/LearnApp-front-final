import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { User } from '../models/user.model'
import { BehaviorSubject, Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.baseApiUrl
  private readonly userStorageKey = 'currentUser'

  private userSubject: BehaviorSubject<User | null>
  public user$: Observable<User | null>

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem(this.userStorageKey)
    this.userSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    )
    this.user$ = this.userSubject.asObservable()
  }

  me() {
    return this.http
      .get<User>(`${this.apiUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      .pipe(
        tap((user) => {
          this.setUser(user as User)
        })
      )
  }

  delete() {
    return this.http
      .delete(`${this.apiUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      .pipe(tap(() => this.clearUser()))
  }

  changePassword(
    oldPassword: string,
    newPassword: string,
    newPasswordConfirmed: string
  ) {
    return this.http
      .put(
        `${this.apiUrl}/users/update-password`,
        {
          oldPassword,
          newPassword,
          newPasswordConfirmed,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      )
      .pipe(tap(() => this.clearUser()))
  }

  setUser(data: User) {
    this.userSubject.next(data)
    localStorage.setItem(this.userStorageKey, JSON.stringify(data))
  }

  getUser(): User | null {
    return this.userSubject.value
  }

  clearUser() {
    this.userSubject.next(null)
    localStorage.removeItem(this.userStorageKey)
    localStorage.removeItem('authToken')
  }
  getAllTrainers() {
    return this.http.get(`${this.apiUrl}/users/trainers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
  }

  updateProfile({
    firstName,
    lastName,
    email,
    username,
    specializationId,
    dateOfBirth,
    address,
    isActive,
  }: {
    firstName: string
    lastName: string
    email: string
    username: string
    specializationId?: string
    dateOfBirth?: string
    address?: string
    isActive: boolean | undefined
  }) {
    return this.http.put(
      `${this.apiUrl}/users/update-user`,
      {
        firstName,
        lastName,
        username,
        email,
        dateOfBirth,
        address,
        specializationId,
        isActive,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    )
  }
}
