import { Component } from '@angular/core';
import { ButtonComponent } from '../../app/features/shared/components/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router) {}

  joinUsClick = () => {
    this.router.navigate(['/join-us']);
  };

  signInClick = () => {
    this.router.navigate(['/login']);
  };

  accountClick = () => {
    this.router.navigate(['/my-account']);
  };

  signOutClick = () => {
    this.router.navigate(['/home']);
  };
}
