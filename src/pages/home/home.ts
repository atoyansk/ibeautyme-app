import { Component} from '@angular/core';
import { Platform, NavController, PopoverController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import { PopoverPage } from '../popover/popover';
import { CompanyPage } from '../company/company';
import { RangePipe } from '../../pipes/range-pipe';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  logadoStyle: boolean;
  userId: string;

  lists: any;
  dados: any;
  
  constructor(public navCtrl: NavController, public geolocation: Geolocation, 
    public db: AngularFireDatabase,
    public popoverCtrl: PopoverController, 
    private afAuth: AngularFireAuth,
    public platform: Platform) {

      platform.ready().then(() => {
        this.loadList();
      });

      this.afAuth.authState.subscribe(user => {
        if(user){
          this.userId = user.uid;
          this.logadoStyle = true;
        } else{
          this.logadoStyle = false;
        }
      })
    }

    loadList(){
        
        //this.dados = this.db.list("empresa/").valueChanges();
        
        this.lists = this.db.list("empresa/").snapshotChanges()
        .map(snapshots => {
          return snapshots.map(snapshot => 
            snapshot.payload.val());
        })
        .map(data => {
          console.log(data);
          this.applyHaversine(data);
 
          data.sort((locationA, locationB) => {
              return locationA.distance - locationB.distance;
          });

          return data;
        });
      };

    applyHaversine(data){

      this.geolocation.getCurrentPosition().then((position) => {
        
        let usersLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }

        data.map((data) => {

            let placeLocation = {
                lat: data.latitude,
                lng: data.longitude
            };

            data.distance = +this.getDistanceBetweenPoints(
                usersLocation,
                placeLocation,
                'km'
            ).toFixed(2);
        });

        return data;

      }, (err) => {
        console.log(err);
      });
    };
  
    getDistanceBetweenPoints(start, end, units){
 
      let earthRadius = {
          miles: 3958.8,
          km: 6371
      };

      let R = earthRadius[units || 'km'];
      let lat1 = start.lat;
      let lon1 = start.lng;
      let lat2 = end.lat;
      let lon2 = end.lng;

      let dLat = this.toRad((lat2 - lat1));
      let dLon = this.toRad((lon2 - lon1));
      let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c;

      return d;

    }
  
    toRad(x){
        return x * Math.PI / 180;
    }


    presentPopover(myEvent) {
      let popover = this.popoverCtrl.create(PopoverPage);
      popover.present({
        ev: myEvent
      });
    }

    goDetail = (idPerfil: any) => { 
        console.log(idPerfil);
        this.navCtrl.push(CompanyPage, {idPerfil}); 
      };

  }