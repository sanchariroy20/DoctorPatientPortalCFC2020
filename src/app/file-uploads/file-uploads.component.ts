import { Component, OnInit, Input } from '@angular/core';
import { PatientService } from '../patient.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-file-uploads',
  templateUrl: './file-uploads.component.html',
  styleUrls: ['./file-uploads.component.css']
})
export class FileUploadsComponent implements OnInit {
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
    const userObj = {
      emailid: this.user
    };
    this.patientservice.getUserUploadedFiles(userObj).subscribe(data => {
      data["object"].forEach(element => {
        this.PdfUrlList.push(element);
      });
    });
    this.getDoctorList();
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
