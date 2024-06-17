import { Component, ViewChild } from '@angular/core'
import { ButtonComponent } from '../../shared/components/button/button.component'
import { TextComponent } from '../../shared/components/text/text.component'
import { InputComponent } from '../../shared/components/input/input.component'
import { FormsModule, NgForm } from '@angular/forms'
// import { HttpClientModule } from '@angular/common/http'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faCircleCheck, faLock } from '@fortawesome/free-solid-svg-icons'
import { CommonModule, Location } from '@angular/common'
import { UserService } from '../../../../services/user.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    ButtonComponent,
    TextComponent,
    InputComponent,
    FormsModule,
    // HttpClientModule,
    FontAwesomeModule,
    CommonModule,
  ],
  // providers: [UserService],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  @ViewChild('changePasswordForm') changePasswordForm!: NgForm
  oldPassword?: string
  newPassword?: string
  confirmNewPassword?: string
  isLoading: boolean = false
  lockIcon = faLock
  circleCheckIcon = faCircleCheck
  private localStorage: Storage = localStorage
  isSuccess: boolean = false

  constructor(
    private location: Location,
    private router: Router,
    private userService: UserService
  ) {}

  onCancelClick() {
    this.location.back()
  }

  onSignIn() {
    this.router.navigate(['/login'])
  }

  onSubmit() {
    const formControlNames = Object.keys(this.changePasswordForm.form.controls)
    if (
      formControlNames.some(
        (controlName) =>
          this.changePasswordForm.form.controls[controlName].invalid
      )
    ) {
      formControlNames.forEach((controlName) => {
        this.changePasswordForm.form.controls[controlName].markAsDirty()
      })
      return
    }
    this.isLoading = true
    this.userService
      .changePassword(
        this.oldPassword!,
        this.newPassword!,
        this.confirmNewPassword!
      )
      .subscribe({
        next: () => {
          this.isLoading = false
          this.localStorage.removeItem('authToken')
          this.isSuccess = true
        },
        error: () => {
          this.isLoading = false
        },
      })
  }

  get oldPasswordError(): string | null {
    const oldPasswordCtrl =
      this.changePasswordForm?.form?.controls['oldPassword']
    if (oldPasswordCtrl?.dirty === false) {
      return null
    }
    const oldPasswordErrors = oldPasswordCtrl?.errors
    if (oldPasswordErrors) {
      return 'Old password is required'
    }
    return null
  }

  get newPasswordError(): string | null {
    const newPasswordCtrl =
      this.changePasswordForm?.form?.controls['newPassword']
    if (newPasswordCtrl?.dirty === false) {
      return null
    }
    const newPasswordErrors = newPasswordCtrl?.errors
    if (newPasswordErrors) {
      return 'New password is required'
    }
    return null
  }

  get confirmNewPasswordError(): string | null {
    const confirmNewPasswordCtrl =
      this.changePasswordForm?.form?.controls['confirmNewPassword']
    if (confirmNewPasswordCtrl?.dirty === false) {
      return null
    }
    const confirmNewPasswordErrors = confirmNewPasswordCtrl?.errors
    if (confirmNewPasswordErrors) {
      return 'Confirm new password is required'
    }
    if (
      this.newPassword &&
      this.confirmNewPassword &&
      this.newPassword !== this.confirmNewPassword
    ) {
      return 'Passwords do not match'
    }
    return null
  }
}
