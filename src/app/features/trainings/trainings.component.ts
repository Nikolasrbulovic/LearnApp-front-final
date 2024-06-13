import { Component } from '@angular/core';
import { TableComponent } from '../shared/components/table/table.component';
import { TextComponent } from '../shared/components/text/text.component';
import { ButtonComponent } from '../shared/components/button/button.component';
import { InputComponent } from '../shared/components/input/input.component';

@Component({
  selector: 'app-trainings',
  standalone: true,
  imports: [TableComponent, TextComponent, ButtonComponent, InputComponent],
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.scss',
})
export class TrainingsComponent {}
