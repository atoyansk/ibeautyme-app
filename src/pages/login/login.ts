import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ToastController } from 'ionic-angular';
import { User } from '../../models/user';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { PopoverPage } from './../popover/popover';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user: User){
    try{
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      console.log(result);
      this.navCtrl.pop();
    }
    catch(e){
      console.error(e);
      this.toast.create({
        message: 'Email ou Senha inválidos. Tente novamente!',
        duration: 3000,
        cssClass: 'errorToast'
      }).present();
    } 
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

}
