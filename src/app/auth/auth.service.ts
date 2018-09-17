import { __AUTH_TOKEN, __GOD_TOKEN } from '../constants';
import { DataService } from '../data/data.service';
import { IDoctor } from '../interfaces/idoctor';
import { DRS_DATA, DrsDataResponse, SIGN_IN, SignInResponse } from '../graphql/queries';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isAuthenticated = new BehaviorSubject(false);
  private _isGod = new BehaviorSubject(false);

  private _doctor: IDoctor | undefined;

  get doctor(): IDoctor {
    return this._doctor;
  }

  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  constructor(private apollo: Apollo, private data: DataService) { }

  setUserLogin() {
    this._isAuthenticated.next(true);

    // Fetch Doctor data
    this.apollo.query<DrsDataResponse>({ query: DRS_DATA }).subscribe(result => {
      this._doctor = result.data.doctor;
    }, error => {
      alert(error);
    });

    // Refetch all patient names
    this.data.refetchPatientNames();
  }

  saveUserData(token: string) {
    localStorage.setItem(__AUTH_TOKEN, token);
  }

  login(login: string, password: string) {
    if (this.login) {
      this.apollo.mutate<SignInResponse>({
        mutation: SIGN_IN,
        variables: {
          usr: login,
          pwd: password
        }
      }).subscribe((result) => {
        const token = result.data.signIn.token;
        this.saveUserData(token);
      }, (error) => {
        alert(error);
      });
    }
  }

  logout() {
    console.log("logging out");
    localStorage.removeItem(__AUTH_TOKEN);
    localStorage.removeItem(__GOD_TOKEN); //Just in case
    this._isAuthenticated.next(false);
  }

  autologin() {
    const token = localStorage.getItem(__AUTH_TOKEN);
    if (token) {
      this.setUserLogin();
    }
  }

  // TODO: implement godMode
//  ascend() {
//    const godMode = localStorage.getItem(__GOD_TOKEN);
//    this._isGod.next(true);
//  }

}
