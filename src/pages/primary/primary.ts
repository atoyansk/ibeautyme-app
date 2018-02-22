import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';

@IonicPage()
@Component({
  selector: 'page-primary',
  templateUrl: 'primary.html',
})
export class PrimaryPage {

  homePage = HomePage;
  mapPage = MapPage;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrimaryPage');
  }

}
