import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

import { environment } from '../environments/environment'
import { Training, TrainingType } from '../models/training'

@Injectable({
  providedIn: 'root',
})
export class TrainingsService {
  constructor(private http: HttpClient) {
    console.log('created)')
  }

  getTrainings() {
    return this.http.get<Training[]>(`http://localhost:3004/dev/trainings`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
  }
  getTypes() {
    return this.http.get<TrainingType[]>(
      `http://localhost:3004/dev/trainings/trainingTypes`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    )
  }
  postTraining(training: {
    name: string | undefined
    description: string | undefined
    duration: string | undefined
    trainerId: string | undefined
    typeId: string | undefined
  }) {
    return this.http
      .post(`http://localhost:3004/dev/trainings`, training, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      })
      .pipe()
  }
}
