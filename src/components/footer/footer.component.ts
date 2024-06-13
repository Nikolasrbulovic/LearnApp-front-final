import { Component } from '@angular/core';
import { ButtonComponent } from '../../app/features/shared/components/button/button.component';
import { InputComponent } from '../../app/features/shared/components/input/input.component';
import { TextComponent } from '../../app/features/shared/components/text/text.component';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ButtonComponent, InputComponent, TextComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {}
