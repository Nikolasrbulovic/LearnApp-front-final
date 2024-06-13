import { Component, Input } from '@angular/core';
import { TextComponent } from '../../shared/components/text/text.component';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [TextComponent],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss',
})
export class BoxComponent {
  @Input() tag: string = '';
  @Input() title: string = '';
  @Input() date: string = 'Dec 24, 2024';
  @Input() imgUrl: string = '';
}
