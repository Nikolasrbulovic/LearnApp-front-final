import { Component, Input } from '@angular/core'
import { TextComponent } from '../../../shared/components/text/text.component'
import { CommonModule } from '@angular/common'
import { InputComponent } from '../../../shared/components/input/input.component'
import { Student, User } from '../../../../../models/user.model'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TextComponent, CommonModule, InputComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  @Input() isEditing: boolean = false
  @Input() user?: User

  getStudent(): Student | null {
    if (!this.user || this.user.userType !== 'student') {
      return null
    }

    return this.user as Student
  }
}
