import { Component } from '@angular/core'
import { BoxComponent } from './box/box.component'
import { TextComponent } from '../shared/components/text/text.component'
import { ButtonComponent } from '../shared/components/button/button.component'
import { UserService } from '../../../services/user.service'
import { HttpClientModule } from '@angular/common/http'

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [BoxComponent, TextComponent, ButtonComponent, HttpClientModule],
  providers: [UserService],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss',
})
export class UserHomeComponent {
  userFirstName: string = ''

  constructor(private userService: UserService) {}
  ngOnInit() {
    const user = this.userService.getUser()
    if (!user) {
      this.userService.me().subscribe((user) => {
        this.userFirstName = user.firstName
      })
    } else {
      this.userFirstName = user.firstName
    }
  }
}
