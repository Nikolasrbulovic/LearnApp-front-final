import { CommonModule } from '@angular/common'
import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() variant: 'contained' | 'outlined' = 'contained'
  @Input() color: 'primary' | 'secondary' | 'important' = 'primary'
  @Input() type: 'submit' | 'button' = 'button'
  @Input() isDisabled: boolean = false
  @Input() fullWidth: boolean = false
  @Input() isLoading: boolean = false
  @Input() formName: string = ''
  @Output() click = new EventEmitter<void>()

  loadingIcon = faSpinner

  onClick(event: Event) {
    event.stopPropagation()
    this.click.emit()
  }
}
