import { Component, ViewChild } from '@angular/core'
import { TextComponent } from '../../shared/components/text/text.component'
import { InputComponent } from '../../shared/components/input/input.component'
import { ButtonComponent } from '../../shared/components/button/button.component'
import { Router } from '@angular/router'
import { FormsModule, NgForm } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { AuthApiService } from '../../../../services/auth-api.service'
import { UserService } from '../../../../services/user.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    TextComponent,
    InputComponent,
    ButtonComponent,
    FormsModule,
  ],
  providers: [AuthApiService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm
  username?: string
  password?: string
  loginErrorMsg?: string
  isLoading: boolean = false
  private storage: Storage = localStorage

  constructor(
    private router: Router,
    private authApiService: AuthApiService,
    private userService: UserService
  ) {}

  get usernameError(): string | null {
    const usernameCtrl = this.loginForm?.form?.controls['username']
    if (usernameCtrl?.dirty === false) {
      return null
    }
    const usernameErrors = usernameCtrl?.errors
    if (usernameErrors) {
      return 'Username is required'
    }
    return null
  }

  get passwordError(): string | null {
    const passwordCtrl = this.loginForm?.form?.controls['password']
    if (passwordCtrl?.dirty === false) {
      return null
    }
    const passwordErrors = passwordCtrl?.errors
    if (passwordErrors) {
      return 'Password is required'
    }
    return null
  }

  onSubmit(): void {
    const usernameCtrl = this.loginForm?.form?.controls['username']
    const passwordCtrl = this.loginForm?.form?.controls['password']
    if (usernameCtrl?.invalid || passwordCtrl?.invalid) {
      usernameCtrl?.markAsDirty()
      passwordCtrl?.markAsDirty()
    } else {
      this.isLoading = true

      this.authApiService.login(this.username!, this.password!).subscribe({
        next: (res) => {
          //todo: directly save user with userService.setUser
          this.storage.setItem('authToken', res.authToken)
          this.userService.me().subscribe()
          this.isLoading = false
          this.router.navigate(['/user-home'])
        },
        error: (errorData) => {
          this.isLoading = false
          this.loginErrorMsg = errorData.error.message
        },
      })
    }
  }

  signUpClick = () => {
    this.router.navigate(['/join-us'])
  }
}
