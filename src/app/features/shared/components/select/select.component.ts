import { CommonModule } from '@angular/common'
import { Component, Input, forwardRef } from '@angular/core'
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms'

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() name: string = ''
  @Input() errorMsg: string | null = null
  @Input() isDisabled: boolean = false
  @Input() label: string = ''
  @Input() placeholder: string = ''
  @Input() type: 'text' | 'password' = 'text'
  @Input() value: string = ''
  @Input() required: boolean = false
  @Input() fullWidth: boolean = false
  @Input() options: { value: string; label: string }[] = []

  // ControlValueAccessor interface methods
  onChange: (value: string) => void = () => {}
  onTouched: () => void = () => {}

  // Method to update the password value and propagate the change
  onValueChange(value: string): void {
    this.value = value
    this.onChange(value)
  }

  // ControlValueAccessor method: write the value to the component
  writeValue(value: string): void {
    this.value = value
  }

  // ControlValueAccessor method: register a function to call when the value changes
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn
  }

  // ControlValueAccessor method: register a function to call when the control is touched
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  // ControlValueAccessor method: set the control to be disabled or enabled
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled
  }
}
