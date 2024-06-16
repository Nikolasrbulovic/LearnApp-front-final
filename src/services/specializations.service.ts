import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class SpecializationsService {
  private baseApiUrl = environment.baseApiUrl

  constructor(private http: HttpClient) {}

  getAllSpecializations() {
    return this.http.get(`${this.baseApiUrl}/users/specializations`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    })
  }
}
