import { Component } from '@angular/core'
import { TextComponent } from '../shared/components/text/text.component'
import { ButtonComponent } from '../shared/components/button/button.component'
import { ProfileComponent } from './components/profile/profile.component'
import { CommonModule } from '@angular/common'
import { DeleteAccountComponent } from './components/delete-account/delete-account.component'
import { UserService } from '../../../services/user.service'
import { User } from '../../../models/user.model'
// import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Router } from '@angular/router'

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    TextComponent,
    ButtonComponent,
    ProfileComponent,
    CommonModule,
    DeleteAccountComponent,
    // HttpClientModule,
  ],
  // providers: [HttpClient],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  public isEditing: boolean = false
  user?: User

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    const user = this.userService.getUser()
    if (!user) {
      this.userService.me().subscribe({ next: (user) => (this.user = user) })
      return
    }
    this.user = user
  }

  onEditClick = () => {
    this.isEditing = true
  }

  onCancelClick = () => {
    this.isEditing = false
  }

  onSaveClick = () => {}

  onViewTrainingsClick = () => {
    this.router.navigate(['/trainings'])
  }

  onChangePasswordClick = () => {
    this.router.navigate(['/change-password'])
  }
}
