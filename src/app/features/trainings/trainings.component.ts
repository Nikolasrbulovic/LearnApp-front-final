import { Component } from '@angular/core'
import { TableComponent } from '../shared/components/table/table.component'
import { TextComponent } from '../shared/components/text/text.component'
import { ButtonComponent } from '../shared/components/button/button.component'
import { InputComponent } from '../shared/components/input/input.component'
import { TrainingsService } from '../../../services/trainings-service'
// import { HttpClientModule } from '@angular/common/http'
import { Training } from '../../../models/training'
import { Column } from '../shared/components/table/types'
import { TrainingTableModel } from './types'
import { formatDate } from 'date-fns'
import { UserService } from '../../../services/user.service'
import { Subscription } from 'rxjs'
import { User } from '../../../models/user.model'

@Component({
  selector: 'app-trainings',
  standalone: true,
  imports: [TableComponent, TextComponent, ButtonComponent, InputComponent],
  providers: [TrainingsService],
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss',
})
export class TrainingsComponent {
  user: User | null = null
  private userSubscription: Subscription | null = null
  private trainings: Training[] = []

  constructor(
    private trainingsService: TrainingsService,
    private userService: UserService
  ) {}

  get columnsByUserType(): Column[] {
    if (!this.trainings || !this.user) {
      return []
    }
    if (this.user.role === 'student') {
      return [
        { name: 'Date' },
        { name: 'Training name', cellClass: 'bold' },
        { name: 'Type', cellClass: 'pill' },
        { name: 'Trainer name' },
        { name: 'Duration' },
      ]
    } else {
      return [
        { name: 'Date' },
        { name: 'Training name', cellClass: 'bold' },
        { name: 'Type', cellClass: 'pill' },
        { name: 'Student name' },
        { name: 'Duration' },
      ]
    }
  }

  get rowsByUserType(): TrainingTableModel[] {
    if (!this.trainings || !this.user) {
      return []
    }

    if (this.user.role === 'student') {
      return this.trainings.map((training) => ({
        date: formatDate(training.date, 'dd.MM.yyyy'),
        duration: `${training.duration} d`,
        trainerName: training.trainer.fullName,
        trainingName: training.name,
        type: training.type.type,
      }))
    } else {
      return this.trainings.map((training) => ({
        date: formatDate(training.date, 'dd.MM.yyyy'),
        duration: `${training.duration} d`,
        studentName: training.student.fullName,
        trainingName: training.name,
        type: training.type.type,
      }))
    }
  }

  ngOnInit() {
    this.userSubscription = this.userService.user$.subscribe((user) => {
      this.user = user
    })
    this.trainingsService.getTrainings().subscribe((trainings) => {
      this.trainings = trainings
    })
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe()
    }
  }
}
