import { Component, Input } from '@angular/core'
import { TextComponent } from '../../../shared/components/text/text.component'
import { CommonModule } from '@angular/common'
import { InputComponent } from '../../../shared/components/input/input.component'
import { Student, Trainer, User } from '../../../../../models/user.model'
import { SelectComponent } from '../../../shared/components/select/select.component'
import { SpecializationsService } from '../../../../../services/specializations.service'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TextComponent, CommonModule, InputComponent, SelectComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  @Input() isEditing: boolean = false
  @Input() user?: User

  constructor(private specializationsService: SpecializationsService) {}

  public specializations: { value: string; label: string }[] = []

  getStudent(): Student | null {
    if (!this.user || this.user.role !== 'student') {
      return null
    }

    return this.user as Student
  }

  getTrainer(): Trainer | null {
    if (!this.user || this.user.role !== 'trainer') {
      return null
    }

    return this.user as Trainer
  }

  ngOnInit(): void {
    this.specializationsService
      .getAllSpecializations()
      .subscribe((data: any) => {
        this.specializations = data.map((item: any) => ({
          value: item.id,
          label: item.specialization,
        }))
      })
  }
}
