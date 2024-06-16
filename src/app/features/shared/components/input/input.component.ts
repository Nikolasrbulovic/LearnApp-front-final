import { CommonModule } from '@angular/common'
import { Component, Input, forwardRef } from '@angular/core'
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() name: string = ''
  @Input() errorMsg: string | null = null
  @Input() isDisabled: boolean = false
  @Input() label: string = ''
  @Input() placeholder: string = ''
  @Input() type: 'text' | 'password' = 'text'
  @Input() fullWidth: boolean = false

  value?: string
  warningIcon = faExclamationTriangle

  onChange: (value: string) => void = () => {}
  onTouched: () => void = () => {}

  onValueChange(value: string): void {
    this.value = value
    this.onChange(value)
  }

  writeValue(value: string): void {
    this.value = value
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled
  }
}
