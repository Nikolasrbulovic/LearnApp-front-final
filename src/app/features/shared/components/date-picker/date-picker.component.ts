import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { provideNativeDateAdapter } from '@angular/material/core'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [MatDatepickerModule, MatInputModule, MatFormFieldModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent {
  selectedDate: Date | null = null
  @Input() label: string = ''
  @Output() dateChange = new EventEmitter<Date | null>()

  onDateChange(event: any) {
    this.selectedDate = event.value
    this.dateChange.emit(this.selectedDate)
  }
}
