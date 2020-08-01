import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { LoginComponent } from './login/login.component';
import { UserPdfComponent } from './user-pdf/user-pdf.component';
import { SessionListComponent } from './session-list/session-list.component';
import { NearbyComponent } from './nearby/nearby.component';
import { DoctorhomeComponent } from './doctorhome/doctorhome.component';
import { DoctorreportComponent } from './doctorreport/doctorreport.component';
import { MlportalComponent } from './mlportal/mlportal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FileUploadsComponent } from './file-uploads/file-uploads.component';


const routes: Routes = [{
  path: "",
  redirectTo: 'dashboard',
  pathMatch: "full"
},
{ path: 'login', component: LoginComponent },
{ path: 'SessionList', component: UserPdfComponent },
{ path: 'sessions', component: SessionListComponent },
{ path: 'nearby', component: NearbyComponent },
{ path: 'doctorhome', component: DoctorhomeComponent },
{ path: 'userreport', component: DoctorreportComponent },
{ path: 'mlportal', component: MlportalComponent },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'files', component: FileUploadsComponent }
];

@NgModule({
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
