import { Component, ViewChild } from '@angular/core';
import { TextComponent } from '../../shared/components/text/text.component';
import { InputComponent } from '../../shared/components/input/input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Router } from '@angular/router';
import { FormsModule, NgForm} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthApiService } from '../services/auth-api.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    TextComponent,
    InputComponent,
    ButtonComponent,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthApiService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  username?: string;
  password?: string;
  usernameErrorMsg: string = '';

  constructor(private router: Router, private authApiService: AuthApiService) {}

  get usernameError(): string | null {
    const usernameCtrl = this.loginForm?.form?.controls['username'];
    if (usernameCtrl?.dirty === false) {
      return null;
    }
    const usernameErrors = usernameCtrl?.errors;
    if (usernameErrors) {
      return 'Username is required';
    }
    return null;
  }

  get passwordError(): string | null {
    const passwordCtrl = this.loginForm?.form?.controls['password'];
    if (passwordCtrl?.dirty === false) {
      return null;
    }
    const passwordErrors = passwordCtrl?.errors;
    if (passwordErrors) {
      return 'Password is required';
    }
    return null;
  }

  onSubmit(): void {
    const usernameCtrl = this.loginForm?.form?.controls['username'];
    const passwordCtrl = this.loginForm?.form?.controls['password'];
    if (usernameCtrl?.invalid || passwordCtrl?.invalid) {
      usernameCtrl?.markAsDirty();
      passwordCtrl?.markAsDirty();
    } else {
      this.authApiService.login(this.username!, this.password!).subscribe((value: any) => console.log(value));
    }
   
  }

  signUpClick = () => {
    this.router.navigate(['/join-us']);
  };
}
