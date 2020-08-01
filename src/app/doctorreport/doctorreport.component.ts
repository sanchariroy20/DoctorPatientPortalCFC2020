import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-doctorreport',
  templateUrl: './doctorreport.component.html',
  styleUrls: ['./doctorreport.component.css']
})
export class DoctorreportComponent implements OnInit {
  anotherDoctorList: Object[] = [];
  PdfUrlList: Object[] = [];
  newDoctorList: any;
  user: any;
  constructor(private patientservice: PatientService, private router: Router) { }

  ngOnInit(): void {
    const session = sessionStorage.getItem("sessionId");
    if (session == null) {
      this.router.navigate(['/login']);
    }
    this.user = sessionStorage.getItem("user");
    const userObj = {
      "emailid": this.user
    };
    this.patientservice.getPatientReportListForDoctor(userObj).subscribe(data => {
      data["Objects"].forEach(element => {
        this.PdfUrlList.push(element);
      });
    });
  }

  logOff() {
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("sessionId");
    this.router.navigate(['/login']);
  }

  getDoctorList() {
    this.patientservice.getDoctorList().subscribe(data => {
      data["object"].forEach(element => {
        this.anotherDoctorList.push(element);
      });
    });
  }

}
