import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { environment } from '../environments/environment'
import { Training } from '../models/training'

@Injectable({
  providedIn: 'root',
})
export class TrainingsService {
  constructor(private http: HttpClient) {}

  getTrainings() {
    return this.http.get<Training[]>(`http://localhost:3004/dev/trainings`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
  }
}
