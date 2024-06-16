import { Component } from '@angular/core'
import { TableComponent } from '../shared/components/table/table.component'
import { TextComponent } from '../shared/components/text/text.component'
import { ButtonComponent } from '../shared/components/button/button.component'
import { InputComponent } from '../shared/components/input/input.component'
import { TrainingsService } from '../../../services/trainings-service'
import { HttpClientModule } from '@angular/common/http'
import { Training } from '../../../models/training'
import { Column } from '../shared/components/table/types'
import { TrainingTableModel } from './types'
import { formatDate } from 'date-fns'

@Component({
  selector: 'app-trainings',
  standalone: true,
  imports: [
    TableComponent,
    TextComponent,
    ButtonComponent,
    InputComponent,
    HttpClientModule,
  ],
  providers: [TrainingsService],
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss',
})
export class TrainingsComponent {
  trainings: Training[] = []
  columns: Column[] = [
    { name: 'Date' },
    { name: 'Training name', cellClass: 'bold' },
    { name: 'Type', cellClass: 'pill' },
    { name: 'Trainer name' },
    { name: 'Duration' },
  ]
  rows: TrainingTableModel[] = []
  constructor(private trainingsService: TrainingsService) {}

  ngOnInit() {
    this.trainingsService.getTrainings().subscribe((trainings) => {
      this.rows = trainings.map((training) => ({
        date: formatDate(training.date, 'dd.MM.yyyy'),
        duration: `${training.duration} d`,
        trainerName: training.trainerId,
        trainingName: training.name,
        type: training.type.type,
      }))
    })
  }
}
