import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GraphQLModule } from './apollo.config';
import { AuthService } from './auth/auth.service';
import { RouterModule } from '@angular/router';
import { PatientComponent } from './patient/patient.component';
import { FormsModule } from '@angular/forms';

import { TypeaheadModule, BsDatepickerModule } from 'ngx-bootstrap';

// Fontawesome stuff
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAddressCard, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { WelcomeComponent } from './welcome/welcome.component';

library.add(faKey, faAddressCard, faUserCircle);
// End Fontawesome stuff (+ import)

@NgModule({
  declarations: [
    AppComponent,
    PatientComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'patient', component: PatientComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: '/welcome', pathMatch: 'full' },
      { path: '**', redirectTo: '/welcome', pathMatch: 'full' }
    ]),
    TypeaheadModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FontAwesomeModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]

})
export class AppModule { }
