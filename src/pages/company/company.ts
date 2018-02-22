import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {

    this.perfil = this.db.list('empresa/', 
    ref => ref.orderByChild('idPerfil').equalTo(this.idPerfil)).valueChanges();

    this.navParams = navParams;
    console.log(this.navParams); // returns NavParams {data: Object}

  }

}
