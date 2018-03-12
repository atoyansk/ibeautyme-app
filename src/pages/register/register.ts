import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { Profile } from '../../models/profile'
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoginPage } from '../login/login';


//@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  profile = {} as Profile;
  userId: string;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register(user: User, profile: Profile){
    try{
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(auth => {
          this.db.object(`users/${auth.uid}`).set(this.profile)
          .then(() => this.navCtrl.push(LoginPage));
        }
      );
      console.log(result);
    }
    catch(e){
      console.error(e);
    } 
  }

}
