import { ListAgendaPage } from './../list-agenda/list-agenda';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


//@IonicPage()
@Component({
  selector: 'page-ready',
  templateUrl: 'ready.html',
})
export class ReadyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ReadyPage');
  // }

  listAgenda(){
    this.navCtrl.push(ListAgendaPage);
  }

}
