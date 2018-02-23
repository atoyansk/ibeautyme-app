import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, NavParams, IonicPage, PopoverController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Rx';
import { CompanyPage } from '../company/company';
import { PopoverPage } from './../popover/popover';


declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('mapa') mapElement: ElementRef;
  mapa: any;
  markers: any;
 
  constructor(public navCtrl: NavController, 
      public geolocation: Geolocation, 
      public db: AngularFireDatabase, private zone: NgZone,
      public popoverCtrl: PopoverController) { 
        
        (window as any).angularComponent = { 
          goDetail: this.goDetail, 
          zone: zone 
        };
        
      }


  ionViewDidLoad(){
    this.loadMap();
  }

  getMarkers(){
    this.markers = this.db.list("empresa/").snapshotChanges()
      .map(snapshots => {
        return snapshots.map(snapshot => 
          snapshot.payload.val());
      })
      .subscribe(marcas => {
        console.log(marcas);
        this.addMarkers(marcas);
      });
  }
 
  loadMap(){
 
    this.geolocation.getCurrentPosition().then((position) => {
      
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
  
        this.mapa = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.getMarkers();
  
    }, (err) => {
      console.log(err);
    });
  }

  addMarkers(marcas) {
    let marca;
    let markerLatLng;
    let lat;
    let lng;
    let title;
    let icon = '../assets/imgs/marker-pink36.png';
    let logo;
    let idPerfil;

    marcas.forEach((marca) => {
      lat = marca.latitude;
      lng = marca.longitude;
      title = marca.nome;
      logo = marca.file;
      idPerfil = marca.idPerfil;

      markerLatLng = new google.maps.LatLng(lat, lng);

      marca = new google.maps.Marker({
        map: this.mapa,
        icon: icon,
        title: title,
        animation: google.maps.Animation.DROP,
        position: markerLatLng
      });

      let markerData = {
        lat: lat,
        lng: lng,
        marker: marca
      };
      marcas.push(markerData);
      
      let contentInfo = '<div id="content">'+
      '<div id="infobox">'+
      '</div>'+
      '<h4 style="width:200px;">'+marca.title+'</h4>'+
      '<div id="bodyContent">'+
      '<img src="'+logo+'" width="100px" style="float:left; margin-right:5px;"/>'+
      '<button onclick="window.angularComponent.goDetail(\'' + idPerfil + '\')" style= "width: 80px; height: 50px; float: right; border-radius: 5px;">Eu quero!</button>'+
      '</div>'+
      '</div>';

      let infowindow = new google.maps.InfoWindow({
        content: contentInfo
      });

      marca.addListener('click', function() {
        infowindow.open(Map, marca);
      });
    });
  }

  goDetail = (idPerfil: any) => { 
    this.zone.run(() => { 
      console.log(idPerfil);
      this.navCtrl.push(CompanyPage, {idPerfil}); 
    }); 
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
