import { Component } from '@angular/core'
import { ButtonComponent } from '../../app/features/shared/components/button/button.component'
import { Router } from '@angular/router'
import { UserService } from '../../services/user.service'
import { HttpClientModule } from '@angular/common/http'
import { Subscription } from 'rxjs'
import { User } from '../../models/user.model'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, HttpClientModule, CommonModule],
  providers: [UserService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router, private userService: UserService) {}

  user: User | null = null
  private userSubscription: Subscription | null = null

  ngOnInit(): void {
    this.userSubscription = this.userService.user$.subscribe((user) => {
      console.log('user se promeniooo', user)
      this.user = user
    })
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe()
    }
  }

  joinUsClick = () => {
    this.router.navigate(['/join-us'])
  }

  signInClick = () => {
    this.router.navigate(['/login'])
  }

  accountClick = () => {
    this.router.navigate(['/my-account'])
  }

  signOutClick = () => {
    this.userService.clearUser()
    this.router.navigate(['/login'])
  }
}
