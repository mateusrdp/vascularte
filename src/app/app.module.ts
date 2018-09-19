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
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDividerModule,
//          MatTooltipModule,
//          MatSnackBarModule,
//          MatDialogModule,
  MatMenuModule,
  MatSelectModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MAT_DATE_LOCALE,
  MatTableModule,
  MatPaginatorModule,
  MatBottomSheetModule,
} from '@angular/material';
import { DocumentComponent } from './document/document.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { FinanceComponent } from './finance/finance.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    WelcomeComponent,
    DocumentComponent,
    AccountSettingsComponent,
    AppSettingsComponent,
    FinanceComponent,
    PaymentComponent,
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
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
//    MatTooltipModule,
//    MatSnackBarModule,
//    MatDialogModule,
    MatMenuModule,
    MatSelectModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatBottomSheetModule,
  ],
  entryComponents: [
    PaymentComponent
  ],
  providers: [AuthService, {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  bootstrap: [AppComponent]

})
export class AppModule { }
