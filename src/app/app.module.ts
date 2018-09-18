// TODO: Use Material Design for themeing

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GraphQLModule } from './apollo.config';
import { AuthService } from './auth/auth.service';
import { RouterModule } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './welcome/welcome.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatIconModule,
  MatButtonModule,
//          MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
//          MatTooltipModule,
//          MatSnackBarModule,
//          MatDialogModule,
  MatSelectModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule, MAT_DATE_LOCALE,
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GraphQLModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'patient', component: PatientComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: '/welcome', pathMatch: 'full' },
      { path: '**', redirectTo: '/welcome', pathMatch: 'full' }
    ]),

    MatIconModule,
    MatButtonModule,
//    MatExpansionModule,
//    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
//    MatTooltipModule,
//    MatSnackBarModule,
//    MatDialogModule,
    MatSelectModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  providers: [AuthService, {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  bootstrap: [AppComponent]

})
export class AppModule { }
