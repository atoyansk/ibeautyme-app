import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from './../popover/popover';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-primary',
  templateUrl: 'primary.html',
})
export class PrimaryPage {

  homePage = HomePage;
  mapPage = MapPage;
  logadoStyle: boolean;
  userId: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, private afAuth: AngularFireAuth) {
  
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.userId = user.uid;
        this.logadoStyle = true;
      } else{
        this.logadoStyle = false;
      }
    })
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrimaryPage');
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
