import { Component, Input } from '@angular/core';
import { TextComponent } from '../../../shared/components/text/text.component';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TextComponent, CommonModule, InputComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  @Input() isEditing: boolean = false;

  public profileData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    username: 'johndoe',
    address: '/',
    dateOfBirth: '01/01/1990',
  };
}
