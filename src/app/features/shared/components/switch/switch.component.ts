import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

@Component({
  selector: 'app-switch',
  standalone: true,
  imports: [FormsModule, MatSlideToggleModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
})
export class SwitchComponent {
  constructor() {}
  @Input() isChecked = false
  @Output() toggleChange = new EventEmitter<boolean>()
  onToggleChange(event: any): void {
    this.isChecked = event.checked
    this.toggleChange.emit(this.isChecked)
  }
}
