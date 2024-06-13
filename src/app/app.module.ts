import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';

import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { JoinUsComponent } from './features/auth/join-us/join-us.component';
import { ButtonComponent } from './features/shared/components/button/button.component';
import { InputComponent } from './features/shared/components/input/input.component';
import { TextModule } from './features/shared/components/text/text.module';
import { FormsModule } from '@angular/forms';
import { UserHomeComponent } from './features/user-home/user-home.component';
import { AuthApiService } from './features/auth/services/auth-api.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TrainingsComponent } from './features/trainings/trainings.component';
import { TableComponent } from './features/shared/components/table/table.component';

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
  ],
  imports: [
    BrowserModule,
    TextModule,
    FormsModule,
    HttpClientModule,
    NgxDatatableModule,
  ],
  providers: [AuthApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
