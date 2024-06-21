import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './features/home/home.component'
import { LoginComponent } from './features/auth/login/login.component'
import { JoinUsComponent } from './features/auth/join-us/join-us.component'
import { UserHomeComponent } from './features/user-home/user-home.component'
import { RegistrationComponent } from './features/auth/registration/registration.component'
import { AccountComponent } from './features/account/account.component'
import { TrainingsComponent } from './features/trainings/trainings.component'
import { RegistrationValidationComponent } from './features/auth/registration-validation/registration-validation.component'
import { ChangePasswordComponent } from './features/auth/change-password/change-password.component'
import { AddTrainingComponent } from './features/add-training/add-training.component'

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'join-us', component: JoinUsComponent },
  { path: 'user-home', component: UserHomeComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'register-validation', component: RegistrationValidationComponent },
  { path: 'my-account', component: AccountComponent },
  { path: 'trainings', component: TrainingsComponent },
  { path: 'add-training', component: AddTrainingComponent },
  { path: '**', component: HomeComponent },
]
