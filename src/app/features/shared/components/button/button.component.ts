import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() variant: 'contained' | 'outlined' = 'contained';
  @Input() color: 'primary' | 'secondary' | 'important' = 'primary';
  @Input() type: 'submit' | 'button' = 'button';
  @Input() isDisabled: boolean = false;
  @Input() fullWidth: boolean = false;
  @Output() click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}
