import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GraphQLModule } from './apollo.config';
import { AuthService } from './auth/auth.service';
import { RouterModule } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'patient', component: PatientComponent },
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '**', redirectTo: '/', pathMatch: 'full' }
    ]),
    TypeaheadModule.forRoot()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]

})
export class AppModule { }
