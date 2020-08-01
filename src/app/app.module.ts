import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserPdfComponent } from './user-pdf/user-pdf.component';
import { HttpClientModule } from "@angular/common/http";
import { SessionListComponent } from './session-list/session-list.component';
import { FormsModule } from '@angular/forms';
import { NearbyComponent } from './nearby/nearby.component';
import { DoctorhomeComponent } from './doctorhome/doctorhome.component';
import { DoctorreportComponent } from './doctorreport/doctorreport.component';
import { MlportalComponent } from './mlportal/mlportal.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DashboardComponent } from './dashboard/dashboard.component';
import { FileUploadsComponent } from './file-uploads/file-uploads.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserPdfComponent,
    SessionListComponent,
    NearbyComponent,
    DoctorhomeComponent,
    DoctorreportComponent,
    MlportalComponent,
    DashboardComponent,
    FileUploadsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
