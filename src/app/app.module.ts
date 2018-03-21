import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2/index';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CalendarComponent } from "ap-angular2-fullcalendar/src/calendar/calendar";
import { Ionic2RatingModule } from 'ionic2-rating';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MapPage } from '../pages/map/map';
import { CompanyPage } from '../pages/company/company';

import { ProfissionalPage } from '../pages/profissional/profissional';
import { PopoverPage } from '../pages/popover/popover';
import { AgendaPage } from '../pages/agenda/agenda';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ReadyPage } from '../pages/ready/ready';
import { ListAgendaPage } from '../pages/list-agenda/list-agenda';

import { Geolocation } from '@ionic-native/geolocation';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { ModalPage } from '../pages/modal/modal';
import { RangePipe } from '../pipes/range-pipe';
import { StartPipe } from '../pipes/start-pipe';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MapPage,
    CompanyPage,
    ProfissionalPage,
    PopoverPage,
    AgendaPage,
    CalendarComponent,
    LoginPage,
    RegisterPage,
    ReadyPage,
    ListAgendaPage,
    ModalPage,
    RangePipe,
    StartPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{tabsPlacement: 'top'}),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapPage,
    CompanyPage,
    ProfissionalPage,
    PopoverPage,
    AgendaPage,
    CalendarComponent,
    LoginPage,
    RegisterPage,
    ReadyPage,
    ListAgendaPage,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
