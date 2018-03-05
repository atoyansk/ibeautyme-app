import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { PopoverPage } from '../popover/popover';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-company',
  templateUrl: 'company.html'
})
export class CompanyPage {

  servicesRoot = 'ServicesPage'
  aboutRoot = 'AboutPage'
  commentsRoot = 'CommentsPage'

  idPerfil: string = this.navParams.get('idPerfil');
  perfil: any;
  servicos: any;
  perfilId: any;

  logadoStyle: boolean;
  userId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public popoverCtrl: PopoverController, private afAuth: AngularFireAuth) {

    this.perfil = this.db.list('empresa/', 
    ref => ref.orderByChild('idPerfil').equalTo(this.idPerfil)).valueChanges();

    this.navParams = navParams;
    console.log(this.navParams); // returns NavParams {data: Object}

    this.afAuth.authState.subscribe(user => {
      if(user){
        this.userId = user.uid;
        this.logadoStyle = true;
      } else{
        this.logadoStyle = false;
      }
    })

  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
