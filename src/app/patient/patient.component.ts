import {DataService} from '../data/data.service';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {MatBottomSheet, MatSnackBar} from '@angular/material';
import {PaymentComponent} from '../payment/payment.component';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(
    private router: Router,
    private data: DataService,
    private auth: AuthService,
    private paymentBottomSheet: MatBottomSheet,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.data.patientAdded.subscribe(patient => {
      if (patient.id > 0) {
        this.snackBar.open(patient.name + ' added to the database', 'ok, thanks', {
          duration: 2000
        });
        this.router.navigate(['/patient']);
      }
    });
    this.data.consultationAdded.subscribe(consultation => {
      if (consultation.id > 0) {
        this.snackBar.open('Consultation added to the database', 'ok, thanks', {
          duration: 2000
        });
        this.router.navigate(['/patient']);
      }
    });
  }

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

  createConsultationIfNeeded() {
    if (this.patient.id > 0 && this.consultation.id <= 0 ) {
      const ref = this.snackBar.open('Start a consultation for ' + this.patient.name + ' on the database?', 'Yes please');
      ref.onAction().subscribe(() => {
        this.data.createConsultationData();
      });
    }
  }

  dismissSnackBar() {
    this.snackBar.dismiss();
  }

}
