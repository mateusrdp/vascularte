import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {IPayment} from '../interfaces/ipayment';
import {DataService} from '../data/data.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {

  paymentsDS = new MatTableDataSource<IPayment>(this.payments);
  displayedPaymentColumns: string[] = ['date', 'insuranceProviderName', 'amountCharged', 'receipt'];

  constructor(private data: DataService) { }

  ngOnInit() {
  }

  get payments() {
    return this.data.payments;
  }

}
