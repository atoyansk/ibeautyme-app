import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker,
  Geocoder,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';
import { Component } from '@angular/core';
import { Platform, NavController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;
  mapElement: HTMLElement;
  markersPos: any = [];
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private googleMaps: GoogleMaps, public platform: Platform, public geolocation: Geolocation) {
  }
  ngAfterViewInit() {
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }

  loadMap() {
    this.mapElement = document.getElementById('map');
      
    let pos: LatLng = new LatLng(43.0741904, -89.3809802);
    
    let mapOptions: GoogleMapOptions = {
            camera: {
              target: pos,
              zoom: 16,
              tilt: 10
            },
            mapType: 'MAP_TYPE_ROADMAP'
          };

          this.map = this.googleMaps.create(this.mapElement, mapOptions);

      // Wait the MAP_READY before using any methods.
          this.map.one(GoogleMapsEvent.MAP_READY)
            .then(() => {
              console.log('Map is ready!');

              var opts = {
                enableHighAccuracy: true
              };
            // Get the location of you
            this.map.getMyLocation(opts)
            .then((location: MyLocation) => {
              console.log(JSON.stringify(location, null ,2));

              // Move the map camera to the location with animation
              this.map.animateCamera({
                target: location.latLng,
                zoom: 16,
                tilt: 10
              }).then(() => {

              this.markersPos = [{
                "title": "Marker 1",
                "latitude": 34.1786998,
                "longitude": -86.6154153,
                "color": 'blue'
              }, {
                "title": "Marker 3",
                "latitude": 34.181607,
                "longitude": -86.617196,
                "color": 'red'
              }, {
                "title": "Marker 2",
                "latitude": 34.179938,
                "longitude": -86.622432,
                "color": 'green'
              }];
              for(let markersPos of this.markersPos){
              // Now you can use all methods safely.
              this.map.addMarker({
                  title: markersPos.title,
                  icon: markersPos.color,
                  animation: GoogleMapsAnimation.BOUNCE,
                  position: {
                    lat: markersPos.latitude,
                    lng: markersPos.longitude
                  }
                })
                .then(marker => {
                  marker.on(GoogleMapsEvent.MARKER_CLICK)
                    .subscribe(() => {
                      alert(markersPos.title);
                    });
                });
              }

            });
          });
        });
      }

  }