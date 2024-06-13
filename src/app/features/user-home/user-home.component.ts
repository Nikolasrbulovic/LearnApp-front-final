import { Component } from '@angular/core';
import { BoxComponent } from './box/box.component';
import { TextComponent } from '../shared/components/text/text.component';
import { ButtonComponent } from '../shared/components/button/button.component';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [BoxComponent, TextComponent, ButtonComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss',
})
export class UserHomeComponent {}
