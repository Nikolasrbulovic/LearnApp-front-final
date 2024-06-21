import { Component, ViewChild } from '@angular/core'
import { TextComponent } from '../shared/components/text/text.component'
import { ButtonComponent } from '../shared/components/button/button.component'
import { ProfileComponent } from './components/profile/profile.component'
import { CommonModule } from '@angular/common'
import { DeleteAccountComponent } from './components/delete-account/delete-account.component'
import { UserService } from '../../../services/user.service'
import { User } from '../../../models/user.model'
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
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  @ViewChild(ProfileComponent) profileComponent!: ProfileComponent
  public isEditing: boolean = false
  user?: User
  updatedUser: any
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    const user = this.userService.getUser()
    if (!user) {
      this.userService.me().subscribe({ next: (user) => (this.user = user) })
      return
    }
    this.user = user
  }
  handleFormUpdate(updatedUser: User): void {
    console.log('Updated User:', updatedUser) // Log the updated user data
    this.updatedUser = updatedUser
  }
  onEditClick = () => {
    this.isEditing = true
  }

  onCancelClick = () => {
    this.isEditing = false
  }

  onSaveClick = () => {
    if (this.profileComponent) {
      this.profileComponent.onSubmit()
      this.isEditing = false
    }
  }

  onViewTrainingsClick = () => {
    this.router.navigate(['/trainings'])
  }

  onChangePasswordClick = () => {
    this.router.navigate(['/change-password'])
  }
}
