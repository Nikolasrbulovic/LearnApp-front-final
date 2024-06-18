import { Component, Input, ViewChild } from '@angular/core'
import { TextComponent } from '../../../shared/components/text/text.component'
import { CommonModule } from '@angular/common'
import { InputComponent } from '../../../shared/components/input/input.component'
import { Student, Trainer, User } from '../../../../../models/user.model'
import { SelectComponent } from '../../../shared/components/select/select.component'
import { SpecializationsService } from '../../../../../services/specializations.service'
import { FormsModule, NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { UserService } from '../../../../../services/user.service'
import { ButtonComponent } from '../../../shared/components/button/button.component'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    TextComponent,
    CommonModule,
    InputComponent,
    SelectComponent,
    FormsModule,
    ButtonComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  @ViewChild('profileForm') profileForm!: NgForm

  @Input() isEditing: boolean = false
  user: User | null = null
  isLoading: boolean = false
  firstName?: string
  lastName?: string
  email?: string
  specialization?: string
  dateOfBirth?: string
  address?: string
  username?: string

  constructor(
    private specializationsService: SpecializationsService,
    private router: Router,
    private userService: UserService
  ) {}

  public specializations: { value: string; label: string }[] = []

  getStudent(): Student | null {
    if (!this.user || this.user.role !== 'student') {
      return null
    }

    return this.user as Student
  }

  getTrainer(): Trainer | null {
    if (!this.user || this.user.role !== 'trainer') {
      return null
    }

    return this.user as Trainer
  }

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user
      if (user) {
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.email = user.email
        this.username = user.username
        if (user.role === 'trainer') {
          this.specialization = user.specialization.id
        } else {
          this.dateOfBirth = user.dateOfBirth
          this.address = user.address
        }
      }
    })

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
    const formControlNames = Object.keys(this.profileForm.form.controls)
    if (
      formControlNames.some(
        (controlName) => this.profileForm.form.controls[controlName].invalid
      )
    ) {
      formControlNames.forEach((controlName) => {
        this.profileForm.form.controls[controlName].markAsDirty()
      })
      return
    }

    if (this.user?.role === 'trainer') {
      this.isLoading = true
      this.userService
        .updateProfile({
          firstName: this.firstName!,
          lastName: this.lastName!,
          email: this.email!,
          specializationId: this.specialization,
          userType: this.user.role,
          username: this.username!,
        })
        .subscribe({
          next: (res) => {
            this.isEditing = false
            this.userService.me().subscribe()
            this.isLoading = false
          },
          error: () => {
            this.isLoading = false
          },
        })
    } else {
      this.userService
        .updateProfile({
          firstName: this.firstName!,
          lastName: this.lastName!,
          email: this.email!,
          userType: this.user!.role,
          dateOfBirth: this.dateOfBirth!,
          address: this.address!,
          username: this.username!,
        })
        .subscribe({
          next: () => {
            this.isEditing = false
            this.userService.me().subscribe()
            this.isLoading = false
          },
          error: () => {
            this.isLoading = false
          },
        })
    }
  }

  get usernameErrorMsg(): string | null {
    const usernameCtrl = this.profileForm?.form?.controls['firstName']
    if (usernameCtrl?.dirty === false) {
      return null
    }
    const usernameErrors = usernameCtrl?.errors
    if (usernameErrors) {
      return 'First name is required'
    }
    return null
  }

  get firstNameErrorMsg(): string | null {
    const usernameCtrl = this.profileForm?.form?.controls['firstName']
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
    const lastNameCtrl = this.profileForm?.form?.controls['lastName']
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
    const emailCtrl = this.profileForm?.form?.controls['email']
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
      this.profileForm?.form?.controls['specialization']
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
