import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { AuthApiService } from '../services/auth-api.service'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { TrainingsService } from '../services/trainings-service'

@NgModule({
  imports: [BrowserModule, FormsModule, NgxDatatableModule],
  providers: [AuthApiService, TrainingsService],
})
export class AppModule {}
