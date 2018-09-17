import { AuthService } from './auth/auth.service';
import { DataService } from './data/data.service';
import { IDoctor } from './interfaces/idoctor';
import { IPatient } from './interfaces/ipatient';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Vascularte';
  private login: string;
  private password: string;
  private patientName: string;
  

  constructor(
    private authService: AuthService,
    private apollo: Apollo,
    private router: Router,
    private data: DataService
  ) {}

  ngOnInit() {
    this.authService.autologin();
  }

  /**
   * Authentication Stuff
   */

  get doctor() {
    return this.authService.doctor;
  }

  confirm() {
    this.authService.login(this.login, this.password);
    this.router.navigate(['/patient']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  /**
   * Search Stuff
   */

  get allPatientNames(): string[] {
    return this.data.allPatientNames;
  }

  loadPatientData() {
    this.data.loadPatientData(this.patientName);
  }
}
