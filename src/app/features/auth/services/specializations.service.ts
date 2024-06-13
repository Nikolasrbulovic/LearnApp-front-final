import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export class SpecializationsService {
  private readonly authApiPath = 'http://localhost:3003/dev/users'

  constructor(private http: HttpClient) {}

  getAllSpecializations() {
    return this.http.get(`${this.authApiPath}/specializations`)
  }
}
