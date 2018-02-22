import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ServicesPage } from '../services/services';

@IonicPage()
@Component({
  selector: 'page-profissional',
  templateUrl: 'profissional.html',
})
export class ProfissionalPage {

  servicos = this.navParams.data.s;
  idPerfil: string = this.navParams.data.s.idPerfil;

  perfil: any;
  profissional: any;

  selectProf: any;
  profName: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfissionalPage');
    console.log(this.idPerfil);
    this.getPerfil();
    this.getProfissional();
  }

  getPerfil(){
    this.perfil = this.db.list('empresa/', 
    ref => ref.orderByChild('idPerfil').equalTo(this.idPerfil)).valueChanges();
  }

  getProfissional(){
    this.profissional = this.db.list('prof-emp/', 
    ref => ref.orderByChild('idPerfil').equalTo(this.idPerfil)).valueChanges();
  }

  selectchange(){
    this.selectProf = this.db.list('prof-emp/', 
    ref => ref.orderByChild('nome').equalTo(this.profName)).valueChanges();
    console.log(this.profName);
  }

}
