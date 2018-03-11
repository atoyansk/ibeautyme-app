import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { ListAgendaPage } from '../list-agenda/list-agenda';

//@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  userId: string;
  logado:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe(user => {
      if(user){
        this.userId = user.uid;
        this.logado = true;
      } else{
        this.logado = false;
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  login(){
    this.navCtrl.push(LoginPage);
    this.viewCtrl.dismiss();
  }

  listAgenda(){
    this.navCtrl.push(ListAgendaPage);
    this.viewCtrl.dismiss();
  }

  logout(){
    this.afAuth.auth.signOut();
    this.viewCtrl.dismiss();
  }

}
