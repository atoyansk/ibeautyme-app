import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { ServicesPage } from '../services/services';
import { PopoverPage } from '../popover/popover';
import { AgendaPage } from './../agenda/agenda';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-profissional',
  templateUrl: 'profissional.html',
})
export class ProfissionalPage {

  servicos = this.navParams.data.s;
  idPerfil: string = this.navParams.data.s.idPerfil;
  sNome: string = this.navParams.data.s.nome;
  sTempo: string = this.navParams.data.s.tempo;

  perfil: any;
  profissional: any;

  selectProf: any;
  profName: any;

  logadoStyle: boolean;
  userId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public popoverCtrl: PopoverController, private afAuth: AngularFireAuth) {

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

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  goTo(ev){
    let detail = {idEmp: this.idPerfil, nServico: this.sNome, tServico: this.sTempo, nProf: this.profName}
    console.log(detail);
    this.navCtrl.push(AgendaPage, {detail});
  }

}
