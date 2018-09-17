import { DataService } from '../data/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(private data: DataService) {}

  ngOnInit() { }

  get patient() {
    return this.data.patient;
  }

}
