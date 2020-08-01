import { Component, OnInit, Directive, Input, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { Router } from "@angular/router"

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.css']
})
export class NearbyComponent implements OnInit {
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;
  center = new google.maps.LatLng(22.4973, 88.3714);
  constructor(private router:Router) { }

  ngOnInit(): void {

    const mapProperties = {
      center: this.center,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    const request = {
      location: this.center,
      radius: 8047,
      types: ['hospital']
    };
    this.map = new google.maps.Map(document.getElementById("map"), mapProperties);
    const service = new google.maps.places.PlacesService(this.map);
    service.nearbySearch(request, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    });

    function createMarker(place) {
      let placeLoc = place.geometry.location;
      let marker = new google.maps.Marker({
        map: this.map,
        position: placeLoc
      });
    }
  }

  logOff() {
    sessionStorage.removeItem("user")
    sessionStorage.removeItem("sessionId");
    this.router.navigate(['/login']);
  }

}
