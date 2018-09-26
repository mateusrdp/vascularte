// TODO: implement toolbar with: Document Printer, Settings and Logout
// TODO: implement Settings with: Insurance Providers, Document Templates (DocType) and Account Settings
// TODO: implement Document Writer/Viewer
// TODO: implement Account Settings with: Doctor Data Maintenance and Data Exporter
// TODO: implement Data Exporter

import { AuthService } from './auth/auth.service';
import { DataService } from './data/data.service';
import { IDoctor } from './interfaces/idoctor';
import { IPatient } from './interfaces/ipatient';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  login: string;
  password: string;
  private _isLogged: boolean;
  private _hasDrData: boolean;

  constructor(
    private authService: AuthService,
    private apollo: Apollo,
    private router: Router,
    private data: DataService
  ) {}

  ngOnInit() {
    this.authService.autologin();
    this.authService.authenticaticonStatusChanges.subscribe(x => {
      this._isLogged = x;
      if (x) {
        this.data.watchPatientNames();
        this.router.navigate(['/patient']);
      }
    });
    this.authService.drDataAvailabilityChanges.subscribe(x => { this._hasDrData = x; });
  }

  /**
   * Authentication Stuff
   */

  get isLogged() {
    return this._isLogged;
  }

  confirm() {
    this.authService.login(this.login, this.password);
    this.authService.authenticaticonStatusChanges.subscribe(ok => {
      if (ok) {
        this.data.watchPatientNames();
        this.router.navigate(['/patient']);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }

  /**
   * Search Stuff
   */

  get allPatientNames() {
    return this.data.allPatientNames;
  }

  loadPatientData(name: string) {
    this.data.loadPatientData(name);
  }

  showAllPatientNames() {
    console.log(this.data.allPatientNames);
  }

}
