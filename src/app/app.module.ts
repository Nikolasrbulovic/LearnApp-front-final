import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'

import { HeaderComponent } from '../components/header/header.component'
import { FooterComponent } from '../components/footer/footer.component'

import { HomeComponent } from './features/home/home.component'
import { LoginComponent } from './features/auth/login/login.component'
import { JoinUsComponent } from './features/auth/join-us/join-us.component'
import { ButtonComponent } from './features/shared/components/button/button.component'
import { InputComponent } from './features/shared/components/input/input.component'
import { TextModule } from './features/shared/components/text/text.module'
import { FormsModule } from '@angular/forms'
import { UserHomeComponent } from './features/user-home/user-home.component'
import { AuthApiService } from '../services/auth-api.service'
import { HttpClientModule } from '@angular/common/http'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { TrainingsComponent } from './features/trainings/trainings.component'
import { TableComponent } from './features/shared/components/table/table.component'
import { UserService } from '../services/user.service'
import { RegistrationComponent } from './features/auth/registration/registration.component'
import { RegistrationValidationComponent } from './features/auth/registration-validation/registration-validation.component'
import { TrainingsService } from '../services/trainings-service'
import { ChangePasswordComponent } from './features/auth/change-password/change-password.component'

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    InputComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    JoinUsComponent,
    UserHomeComponent,
    TrainingsComponent,
    TableComponent,
    RegistrationValidationComponent,
    RegistrationComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    TextModule,
    FormsModule,
    HttpClientModule,
    NgxDatatableModule,
  ],
  providers: [AuthApiService, UserService, TrainingsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
