import {Component, OnInit} from '@angular/core';
import {MatBottomSheetRef, MatSnackBar} from '@angular/material';
import {DataService} from '../data/data.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<PaymentComponent>,
    private data: DataService,
    public snackBar: MatSnackBar
  ) { }

  date: String;
  insuranceProviderName: String;
  amountCharged: Number;
  receipt: Number;

  ngOnInit() {
    this.data.paymentAdded.subscribe( payment => {
      if (payment.id > 0) {
        const snackBarRef = this.snackBar.open(
          'User id: ' + payment.id +
          ' paid ' + payment.amountCharged +
          ' on ' + payment.date +
          '(' + payment.insuranceProviderName + ')',
          'Undo', {duration: 5000});
        snackBarRef.onAction().subscribe(() => {
          this.data.removePayment(payment);
        });
      }
    });
    this.data.paymentRemoved.subscribe( payment => {
      if (payment.id > 0) {
        this.snackBar.open('Undone', '', {duration: 2000});
      }
    });
  }

  openLink(event: MouseEvent) {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  submitPayment() {
    this.data.addPayment(
      this.data.patient.id,
      this.date,
      this.insuranceProviderName,
      this.amountCharged,
      this.receipt
    );
    this.bottomSheetRef.dismiss();
  }

}
