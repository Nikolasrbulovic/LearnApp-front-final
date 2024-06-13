import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class TextComponent {
  @Input() type:
    | 'header'
    | 'header-sm'
    | 'header-md'
    | 'subheader'
    | 'text-md'
    | 'text' = 'text';
  @Input() color: 'primary' | 'grey' | 'default' = 'default';
  @Input() content: string = '';
  @Input() isBold: boolean = false;
}
