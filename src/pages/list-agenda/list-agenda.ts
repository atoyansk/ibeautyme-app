import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


//@IonicPage()
@Component({
  selector: 'page-list-agenda',
  templateUrl: 'list-agenda.html',
})
export class ListAgendaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListAgendaPage');
  }

}
