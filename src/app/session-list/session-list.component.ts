import { Component, OnInit, Input } from '@angular/core';
import { PatientService } from '../patient.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {
  PdfUrlList: Object[] = [];
  user: any;
  newDoctorList: Object[] = [];
  anotherDoctorList: Object[] = [];
  shareToDoctor: boolean = false;
  file_path: any;
  path: any;
  constructor(private patientservice: PatientService, private router: Router) { }

  ngOnInit(): void {
    const session = sessionStorage.getItem("sessionId");
    if (session == null) {
      this.router.navigate(['/login']);
    }
    this.user = sessionStorage.getItem("user");
    this.patientservice.getPdfUrl(this.user).subscribe(data => {
      let pdfObjectData = data;
      pdfObjectData["Objects"].forEach(element => {
        this.PdfUrlList.push(element);
      });
    });

    this.getDoctorList();
  }

  backToDoctor() {
    this.shareToDoctor = false;
    this.newDoctorList = [];
    this.file_path = "";
  }

  onDoctorShare(event, filePath,path) {
    this.path=path;
    this.file_path = filePath;
    this.patientservice.getDoctorList().subscribe(data => {
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
    this.patientservice.sendEmailToDoctor(doctorObj).subscribe(data => {
      if (data["status"] == false) {
        alert("Server Error Occurred");
        this.shareToDoctor = false;
        this.newDoctorList = [];
      }
      else {
        alert("Email Sent To Doctor");
        this.shareToDoctor = false;
        this.newDoctorList = [];
      }
    });
    const newDoctorObj = {
      emailid: this.user,
      doctorEmailId: email,
      file_path: this.file_path,
      path: this.path
    };

    this.patientservice.updateDoctorUserOfPatient(newDoctorObj).subscribe(data => {
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

  onFileUpload(event) {
    let selectedFile = event.target.files[0];
    this.patientservice.getImageUrl(selectedFile).subscribe(data => {
      let getImageUrl = data["response"];
      let userObj = {
        emailid: this.user,
        path: getImageUrl
      };
      this.patientservice.sendImageData(userObj).subscribe(data1 => {
        let status = data1["status"];
        if (status == false) {
          alert("Server Error Occured");
        }
        else {
          alert("File Uploaded");
        }
      })

    });

  }


}
