import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  idPerfil: string = this.navParams.data.idPerfil;

  perfil: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
    this.getEmp();
  }

  getEmp(){
    this.perfil = this.db.list('empresa/', 
    ref => ref.orderByChild('idPerfil').equalTo(this.idPerfil)).valueChanges();
  }

}
