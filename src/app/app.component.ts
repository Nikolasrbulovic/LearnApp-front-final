import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from '../components/header/header.component'
import { FooterComponent } from '../components/footer/footer.component'
import { InputComponent } from './features/shared/components/input/input.component'
import { ButtonComponent } from './features/shared/components/button/button.component'
import { TextComponent } from './features/shared/components/text/text.component'
import { UserService } from '../services/user.service'
import { HttpClientModule } from '@angular/common/http'
import { SpecializationsService } from '../services/specializations.service'
import { SwitchComponent } from './features/shared/components/switch/switch.component'
import { AddTrainingComponent } from './features/add-training/add-training.component'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonComponent,
    InputComponent,
    HeaderComponent,
    FooterComponent,
    TextComponent,
    HttpClientModule,
    SwitchComponent,
    AddTrainingComponent,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [UserService, SpecializationsService, MatNativeDateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'learn-app'

  // constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Fetch the current user when the application starts
    // this.userService.me().subscribe()
  }
}
