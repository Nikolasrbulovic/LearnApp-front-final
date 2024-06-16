import { Component, ViewChild } from '@angular/core'
import { TextComponent } from '../../shared/components/text/text.component'
import { ButtonComponent } from '../../shared/components/button/button.component'
import { InputComponent } from '../../shared/components/input/input.component'
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router'
import { CommonModule } from '@angular/common'
import { SelectComponent } from '../../shared/components/select/select.component'
import { FormsModule, NgForm } from '@angular/forms'
import { AuthApiService } from '../../../../services/auth-api.service'
import { HttpClientModule } from '@angular/common/http'
import { SpecializationsService } from '../../../../services/specializations.service'
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
  isLoading: boolean = false
  private storage: Storage = localStorage

  public specializations: { value: string; label: string }[] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
    const formControlNames = Object.keys(this.registerForm.form.controls)
    if (
      formControlNames.some(
        (controlName) => this.registerForm.form.controls[controlName].invalid
      )
    ) {
      formControlNames.forEach((controlName) => {
        this.registerForm.form.controls[controlName].markAsDirty()
      })
      return
    }

    if (this.userType === 'trainer') {
      this.isLoading = true
      this.authApiService
        .register({
          firstName: this.firstName!,
          lastName: this.lastName!,
          email: this.email!,
          specializationId: this.specialization,
          userType: this.userType,
        })
        .subscribe({
          next: (res) => {
            this.isLoading = false
            this.storage.setItem('authToken', res.authToken)
            const navigationExtras: NavigationExtras = {
              state: {
                username: res.username,
                password: res.password,
              },
            }
            this.router.navigate(['/register-validation'], navigationExtras)
          },
          error: () => {
            this.isLoading = false
          },
        })
    } else {
      this.authApiService.register({
        firstName: this.firstName!,
        lastName: this.lastName!,
        email: this.email!,
        userType: this.userType,
        dateOfBirth: this.dateOfBirth!,
        address: this.address!,
      })
    }
  }

  get firstNameErrorMsg(): string | null {
    const usernameCtrl = this.registerForm?.form?.controls['firstName']
    if (usernameCtrl?.dirty === false) {
      return null
    }
    const usernameErrors = usernameCtrl?.errors
    if (usernameErrors) {
      return 'First name is required'
    }
    return null
  }

  get lastNameErrorMsg(): string | null {
    const lastNameCtrl = this.registerForm?.form?.controls['lastName']
    if (lastNameCtrl?.dirty === false) {
      return null
    }
    const lastNameErrors = lastNameCtrl?.errors
    if (lastNameErrors) {
      return 'Last name is required'
    }
    return null
  }

  get emailErrorMsg(): string | null {
    const emailCtrl = this.registerForm?.form?.controls['email']
    if (emailCtrl?.dirty === false) {
      return null
    }
    const emailErrors = emailCtrl?.errors
    if (emailErrors?.['required']) {
      return 'Email is required'
    }
    if (emailErrors?.['email']) {
      return 'Invalid email'
    }
    return null
  }

  get specializationErrorMsg(): string | null {
    const specializationCtrl =
      this.registerForm?.form?.controls['specialization']
    if (specializationCtrl?.dirty === false) {
      return null
    }
    const specializationErrors = specializationCtrl?.errors
    if (specializationErrors) {
      return 'Specialization is required'
    }
    return null
  }
}
