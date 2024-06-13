import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TextComponent } from '../../../../shared/components/text/text.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-us-box',
  standalone: true,
  imports: [ButtonComponent, TextComponent],
  templateUrl: './join-us-box.component.html',
  styleUrl: './join-us-box.component.scss',
})
export class JoinUsBoxComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imgUrl: string = '';
  @Input() type: 'student' | 'trainer' = 'student';

  constructor(private router: Router) {}

  joinUsClick = () => {
    this.router.navigate(['/register'], {
      queryParams: { userType: this.type },
    });
  };
}
