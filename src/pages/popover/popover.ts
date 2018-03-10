import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';

//@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private afAuth: AngularFireAuth) {}

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

  logout(){
    this.afAuth.auth.signOut();
    this.viewCtrl.dismiss();
  }

}
