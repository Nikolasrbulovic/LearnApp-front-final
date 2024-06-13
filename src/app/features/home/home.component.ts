import { Component } from '@angular/core';
import { TextComponent } from '../shared/components/text/text.component';
import { ButtonComponent } from '../shared/components/button/button.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TextComponent, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
