// TODO: Implement Consultation Data
// TODO: Implement Payments Data
import {DataService} from '../data/data.service';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {MatBottomSheet, MatSnackBar} from '@angular/material';
import {PaymentComponent} from '../payment/payment.component';
import {FormControl, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(
    private data: DataService,
    private auth: AuthService,
    private paymentBottomSheet: MatBottomSheet,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() { }

  get isRegisteredDoctor() {
    return this.auth.isRegisteredDoctor;
  }

  get patient() {
    return this.data.patient;
  }

  newPatient() {
    this.data.newPatient();
  }

  closePatient() {
    this.data.closePatient();
  }

  get consultation() {
    return this.data.consultation;
  }

  openPaymentOptions() {
    this.paymentBottomSheet.open(PaymentComponent);
  }

  createPatientIfNeeded(f: NgForm) {
    if (f.valid && this.patient.id <= 0) {
      const ref = this.snackBar.open('Add ' + f.value.name + ' to the database?', 'Yes please');
      ref.onAction().subscribe(() => {
        this.data.createPatientData();
      });
    }
  }

  dismissSnackBar() {
    this.snackBar.dismiss();
  }

}
