import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from './../popover/popover';

@IonicPage()
@Component({
  selector: 'page-primary',
  templateUrl: 'primary.html',
})
export class PrimaryPage {

  homePage = HomePage;
  mapPage = MapPage;


  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
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
