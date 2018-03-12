import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PrimaryPage } from '../primary/primary';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


//@IonicPage()
@Component({
  selector: 'page-list-agenda',
  templateUrl: 'list-agenda.html',
})
export class ListAgendaPage {

  userId: any;
  agenda: any;
  empresa: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe(user => {
      if(user){
        this.userId = user.uid;
        this.getAgendas();
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListAgendaPage');
    
  }

  getAgendas(){
    this.agenda = this.db.list(`agendamentos/${this.userId}`).valueChanges();
  }

  // getEmpresa(){
  //   this.empresa = this.db.list('empresa/', 
  //   ref => ref.orderByChild('idPerfil').equalTo(this.agenda.)).valueChanges();
  // }

  newAgenda(){
    this.navCtrl.push(PrimaryPage);
  }

}
