import { Component, Input, ViewChild } from '@angular/core'
import { TrainingsService } from '../../../services/trainings-service'
import { UserService } from '../../../services/user.service'
import { ButtonComponent } from '../shared/components/button/button.component'
import { InputComponent } from '../shared/components/input/input.component'
import { FormsModule, NgForm } from '@angular/forms'
import { SelectComponent } from '../shared/components/select/select.component'
import { TextComponent } from '../shared/components/text/text.component'
import { Router } from '@angular/router'
import { DatePickerComponent } from '../shared/components/date-picker/date-picker.component'

@Component({
  selector: 'app-add-training',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    FormsModule,
    SelectComponent,
    TextComponent,
    DatePickerComponent,
  ],
  providers: [TrainingsService],
  templateUrl: './add-training.component.html',
  styleUrl: './add-training.component.scss',
})
export class AddTrainingComponent {
  @ViewChild('addTraining') addTraining!: NgForm
  public trainers: { value: string; label: string }[] = []
  public types: { value: string; label: string }[] = []

  type?: string
  duration?: string
  description?: string
  name?: string
  trainer?: string
  date?: Date
  constructor(
    private trainingsService: TrainingsService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.trainingsService.getTypes().subscribe((data: any) => {
      this.types = data.map((item: any) => ({
        value: item.id,
        label: item.type,
      }))
    })
    this.userService.getAllTrainers().subscribe((data: any) => {
      this.trainers = data.map((item: any) => ({
        value: item.id,
        label: item.fullName,
      }))
    })
  }
  handleDateChange(data: Date) {
    this.date = data
  }
  onSubmit() {
    const formControlNames = Object.keys(this.addTraining.form.controls)
    if (
      formControlNames.some(
        (controlName) => this.addTraining.form.controls[controlName].invalid
      )
    ) {
      formControlNames.forEach((controlName) => {
        this.addTraining.form.controls[controlName].markAsDirty()
      })
      return
    }
    const training = {
      name: this.name,
      description: this.description,
      date: this.date,
      duration: this.duration,
      trainerId: this.trainer,
      typeId: this.type,
    }
    this.trainingsService.postTraining(training).subscribe({
      next: (res) => {
        this.router.navigate(['/my-account'])
      },
      error: () => {},
    })
  }

  get nameErrorMsg(): string | null {
    const nameCtrl = this.addTraining?.form?.controls['name']
    if (nameCtrl?.dirty === false) {
      return null
    }
    const nameErrors = nameCtrl?.errors
    if (nameErrors) {
      return 'Name is required'
    }
    return null
  }

  get durationErrorMsg(): string | null {
    const durationCtrl = this.addTraining?.form?.controls['duration']
    if (durationCtrl?.dirty === false) {
      return null
    }
    const durationErrors = durationCtrl?.errors
    if (durationErrors) {
      return 'duration is required'
    }
    return null
  }

  get descriptionErrorMsg(): string | null {
    const descriptionCtrl = this.addTraining?.form?.controls['email']
    if (descriptionCtrl?.dirty === false) {
      return null
    }
    const descriptionErrors = descriptionCtrl?.errors
    if (descriptionErrors?.['required']) {
      return 'description is required'
    }

    return null
  }
}
