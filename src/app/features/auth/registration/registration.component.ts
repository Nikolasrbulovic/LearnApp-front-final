import { Component, ViewChild } from '@angular/core'
import { TextComponent } from '../../shared/components/text/text.component'
import { ButtonComponent } from '../../shared/components/button/button.component'
import { InputComponent } from '../../shared/components/input/input.component'
import { ActivatedRoute } from '@angular/router'
import { CommonModule } from '@angular/common'
import { SelectComponent } from '../../shared/components/select/select.component'
import { FormsModule, NgForm } from '@angular/forms'
import { AuthApiService } from '../services/auth-api.service'
import { HttpClientModule } from '@angular/common/http'
import { SpecializationsService } from '../services/specializations.service'
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    TextComponent,
    ButtonComponent,
    InputComponent,
    CommonModule,
    SelectComponent,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthApiService, SpecializationsService],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  @ViewChild('registerForm') registerForm!: NgForm
  public userType: string = ''
  firstName?: string
  lastName?: string
  email?: string
  specialization?: string
  dateOfBirth?: string
  address?: string
  public specializations: { value: string; label: string }[] = []

  constructor(
    private route: ActivatedRoute,
    private authApiService: AuthApiService,
    private specializationsService: SpecializationsService
  ) {
    this.route.queryParamMap.subscribe((value) => {
      this.userType = value.get('userType') as string
    })
  }
  ngOnInit(): void {
    this.specializationsService
      .getAllSpecializations()
      .subscribe((data: any) => {
        this.specializations = data.map((item: any) => ({
          value: item.id,
          label: item.specialization,
        }))
      })
  }
  onSubmit(): void {
    const firstNameCtrl = this.registerForm?.form?.controls['firstName']
    const lastNameCtrl = this.registerForm?.form?.controls['lastName']
    const emailCtrl = this.registerForm?.form?.controls['email']
    const specializationCtrl =
      this.registerForm?.form?.controls['specialization']
    const dateOfBirthCtrl = this.registerForm?.form?.controls['dateOfBirth']
    const addressCtrl = this.registerForm?.form?.controls['address']
    if (this.userType === 'trainer') {
      this.authApiService
        .register({
          firstName: this.firstName!,
          lastName: this.lastName!,
          email: this.email!,
          specializationId: this.specialization,
          userType: this.userType,
        })
        .subscribe((res) => console.log(res))
    } else {
      console.log('asd2')

      // this.authApiService.register(
      //   this.firstName!,
      //   this.lastName!,
      //   this.email!,
      //   this.dateOfBirth!,
      //   this.address!
      // )
    }
  }
}
