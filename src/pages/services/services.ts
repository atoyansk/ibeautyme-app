import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ProfissionalPage } from '../profissional/profissional';


@IonicPage()
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {

  idPerfil: string = this.navParams.data.idPerfil;

  servicos: any;

  constructor(public navCtrl: NavController, private app: App, public navParams: NavParams, public db: AngularFireDatabase) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesPage');
    console.log(this.idPerfil);
    this.getServ();
  }

  getServ(){
    this.servicos = this.db.list('serv-emp/', 
    ref => ref.orderByChild('idPerfil').equalTo(this.idPerfil)).valueChanges();
  }

  public profItem(ev, s){
    console.log(s);
    this.app.getRootNavs()[0].push(ProfissionalPage, {s});
  }

}
