import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { PopoverPage } from '../popover/popover';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public popoverCtrl: PopoverController) {

    this.perfil = this.db.list('empresa/', 
    ref => ref.orderByChild('idPerfil').equalTo(this.idPerfil)).valueChanges();

    this.navParams = navParams;
    console.log(this.navParams); // returns NavParams {data: Object}

  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
