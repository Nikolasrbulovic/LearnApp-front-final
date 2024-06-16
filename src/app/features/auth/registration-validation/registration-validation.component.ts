import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { ButtonComponent } from '../../shared/components/button/button.component'
import { TextComponent } from '../../shared/components/text/text.component'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@Component({
  selector: 'app-registration-validation',
  standalone: true,
  imports: [ButtonComponent, TextComponent, FontAwesomeModule],
  templateUrl: './registration-validation.component.html',
  styleUrl: './registration-validation.component.scss',
})
export class RegistrationValidationComponent {
  username: string = ''
  password: string = ''
  circleCheckIcon = faCircleCheck

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation()
    const state = navigation?.extras.state as {
      username: string
      password: string
    }

    if (state) {
      this.username = state.username
      this.password = state.password
    }
  }

  // ngOnInit() {}

  onMyAccountClick() {
    this.router.navigate(['/my-account'])
  }
}
