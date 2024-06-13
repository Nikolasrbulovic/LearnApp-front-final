import { Component } from '@angular/core';
import { TextComponent } from '../shared/components/text/text.component';
import { ButtonComponent } from '../shared/components/button/button.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CommonModule } from '@angular/common';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    TextComponent,
    ButtonComponent,
    ProfileComponent,
    CommonModule,
    DeleteAccountComponent,
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  public isEditing: boolean = false;

  onEditClick = () => {
    console.log('is editing', this.isEditing);
    this.isEditing = true;
  };

  onCancelClick = () => {
    this.isEditing = false;
  };

  onSaveClick = () => {
    console.log('save');
  };
}
