import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isRegisterForm: boolean = false;
  isOtpValid: boolean = false;
  otp: any;
  user: any;
  profileType: any;
  constructor(private patientService: PatientService, private router: Router) { }

  ngOnInit(): void {
    const session = sessionStorage.getItem("sessionId");
    if (session != null) {
      this.router.navigate(['/SessionList']);
    }
  }
  onSubmitRegister(value) {
    this.patientService.sendRegisterUser(value).subscribe(data => {
      alert("User Registered!! You may login now");
    });
  }

  onSubmitSignin(value) {
    this.user = value["emailid"];
    this.profileType = value["user"];
    sessionStorage.setItem("user", this.user);
    this.patientService.getotpForLogin(value).subscribe(data => {
      let result = data;
      if (result["status"] == false) {
        alert("User Not Registered or Please Select the correct profile type");
      }
      else {
        this.isOtpValid = true;
        this.otp = result["otp"];
        alert("OTP sent to mail");
      }
    });
  }

  onSubmitOtpValidate(value) {
    if (value.otp == this.otp) {
      if (this.profileType == "Doctor") {
        this.router.navigate(['/doctorhome']);
        sessionStorage.setItem("user", this.user);
        sessionStorage.setItem("sessionId", Math.random().toString());
      }
      else if (this.profileType == "Patient") {
        this.router.navigate(['/dashboard']);
        sessionStorage.setItem("user", this.user);
        sessionStorage.setItem("sessionId", Math.random().toString());
      }
    }
    else {
      alert("Invalid OTP");
    }

  }

  changeToSignInForm() {
    this.isRegisterForm = false;
  }

  changeToRegisterForm() {
    this.isRegisterForm = true;
  }
}
