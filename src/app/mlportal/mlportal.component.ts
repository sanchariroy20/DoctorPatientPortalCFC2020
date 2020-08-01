import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PatientService } from '../patient.service';
@Component({
  selector: 'app-mlportal',
  templateUrl: './mlportal.component.html',
  styleUrls: ['./mlportal.component.css']
})
export class MlportalComponent implements OnInit {
  PdfUrlList: Object[] = [];
  user: any;
  newDoctorList: Object[] = [];
  shareToDoctor: boolean = false;
  file_path: any;
  constructor(private router: Router, private patientService: PatientService) { }

  ngOnInit(): void {
    const session = sessionStorage.getItem("sessionId");
    if (session == null) {
      this.router.navigate(['/login']);
    }
    this.user = sessionStorage.getItem("user");
    const userObj = {
      emailid: this.user
    };
    this.patientService.getMlImages(userObj).subscribe(data => {
      data["Objects"].forEach(element => {
        this.PdfUrlList.push(element);
      });
    });

  }


  backToDoctor() {
    this.shareToDoctor = false;
    this.newDoctorList = [];
    this.file_path = "";
  }

  onDoctorShare(event, filePath) {
    this.file_path = filePath;
    this.patientService.getDoctorList().subscribe(data => {
      let doctorJson = data;
      doctorJson["object"].forEach(element => {
        this.newDoctorList.push(element);
      });
      this.shareToDoctor = true;
    });
  }

  shareToDoctorByEmail(event, email) {
    const doctorObj = {
      emailid: email,
      path: this.file_path
    };
    this.patientService.sendEmailToDoctor(doctorObj).subscribe(data => {
      if (data["status"] == false) {
        alert("Work In Progress");
        this.shareToDoctor = false;
        this.newDoctorList = [];
      }
      else {
        alert("Email Sent To Doctor");
        this.shareToDoctor = false;
        this.newDoctorList = [];
      }
    });
  }

  logOff() {
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("sessionId");
    this.router.navigate(['/login']);
  }


}
