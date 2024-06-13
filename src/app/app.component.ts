import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { InputComponent } from './features/shared/components/input/input.component';
import { ButtonComponent } from './features/shared/components/button/button.component';
import { TextComponent } from './features/shared/components/text/text.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonComponent,
    InputComponent,
    HeaderComponent,
    FooterComponent,
    TextComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'learn-app';
}
