import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Session } from 'protractor';
import { Router } from "@angular/router"
@Component({
  selector: 'app-user-pdf',
  templateUrl: './user-pdf.component.html',
  styleUrls: ['./user-pdf.component.css']
})
export class UserPdfComponent implements OnInit {
  userData: Object[] = [];
  user: any;
  age: any;
  gender: string;
  name: any;
  address: any;
  city: any;
  blood_pressure: any;
  blood_group: any;
  blood_sugar: any;
  newDoctorList: Object[] = [];

  constructor(private patientservice: PatientService, private router: Router) { }

  ngOnInit(): void {
    const session = sessionStorage.getItem("sessionId");
    if (session == null) {
      this.router.navigate(['/login']);
    }
    this.user = sessionStorage.getItem("user");
    const inputEmailId = document.getElementById("emailid") as HTMLInputElement;
    inputEmailId.readOnly = true;

    this.getDoctorList();
    this.patientservice.getSpecificData(this.user).subscribe(data => {
      let userData = data;
      this.age = userData["Objects"]["0"]["age"];
      this.gender = userData["Objects"]["0"]["gender"];
      this.name = userData["Objects"]["0"]["name"];
      const inputAge = document.getElementById("inputAge") as HTMLInputElement;
      inputAge.readOnly = true;
      const inputName = document.getElementById("name") as HTMLInputElement;
      inputName.readOnly = true;
      if (userData["Objects"]["0"]["user_profile_completed"] == true) {
        this.patientservice.getUserFullDetails(this.user).subscribe(data1 => {
          let fullUserData = data1;
          this.address = fullUserData["Objects"][0]["address"];
          this.blood_group = fullUserData["Objects"][0]["blood_group"];
          this.blood_pressure = fullUserData["Objects"][0]["blood_pressure"];
          this.city = fullUserData["Objects"][0]["city"];
          this.blood_sugar = fullUserData["Objects"][0]["blood_sugar"];
          let inputBG = document.getElementById("inputBG") as HTMLInputElement;
          inputBG.readOnly = true;
        });
      }
    });

  }
  onSubmit(value: any) {
    if (this.checkIfAnyValueNull(value)) {
      alert("please fill all the form");
    }
    else {
      value.user_profile_completed = true;
      this.patientservice.updateUserProfile(value).subscribe(data => {
        alert("User Data Updated");
      });
    }
  }

  checkIfAnyValueNull(obj: Object): boolean {
    for (let key in obj) {
      if (obj[key] == "") {
        return true;
      }
    }
    return false;
  }

  logOff() {
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("sessionId");
    this.router.navigate(['/login']);
  }

  getDoctorList() {
    this.patientservice.getDoctorList().subscribe(data => {
      data["object"].forEach(element => {
        this.newDoctorList.push(element);
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
