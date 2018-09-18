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
  login: string;
  password: string;
  private _isLogged: boolean;
  private _hasDrData: boolean;
  patientName: string;

  constructor(
    private authService: AuthService,
    private apollo: Apollo,
    private router: Router,
    private data: DataService
  ) {}

  ngOnInit() {
    this.authService.autologin();
    this.authService.isAuthenticated.subscribe( x => {this._isLogged = x;});
    this.authService.hasDrData.subscribe(x => { this._hasDrData = x; });
  }

  /**
   * Authentication Stuff
   */

  get isLogged() {
    return this._isLogged;
  }

  get hasDrData() {
    return this._hasDrData;
  }

  get doctor() {
    return this.authService.doctor;
  }

  confirm() {
    this.authService.login(this.login, this.password);
    this.router.navigate(['/patient']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }

  /**
   * Search Stuff
   */

  get allPatientNames(): string[] {
    return this.data.allPatientNames;
  }

  loadPatientData(name: string) {
    this.data.loadPatientData(name);
  }
  newPatient() {
    this.data.newPatient();
    this.router.navigate(['/patient']);
  }
}
