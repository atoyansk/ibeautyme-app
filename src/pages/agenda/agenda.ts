import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ToastController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import * as $ from 'jquery';
import * as moment from "moment";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ReadyPage } from '../ready/ready';
import { LoginPage } from '../login/login';


//@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage {

  details = this.navParams.data.detail;
  empresa = this.navParams.data.detail.idEmp;
  servico = this.navParams.data.detail.nServico;
  profissional = this.navParams.data.detail.nProf;
  preco = this.navParams.data.detail.pServico;
  tempo = this.navParams.data.detail.tServico + ":00";

  initialLocaleCode = 'pt-br';

  logadoStyle: boolean;
  userId: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, private afAuth: AngularFireAuth, private db: AngularFireDatabase, private toast: ToastController) {
  
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
    console.log('ionViewDidLoad AgendaPage');
  }

  calendarOptions:Object = {
    height: 'parent',
    contentHeight: 350,
    locale: this.initialLocaleCode,
    fixedWeekCount : false,
    defaultDate: Date.now(),
    eventDurationEditable: false,
    editable: false,
    eventLimit: true, // allow "more" link when too many events
    defaultView: 'agendaDay',
    allDaySlot: false,
    minTime: '09:00:00',
    maxTime: '20:00:00',
    header: {
      left: '',
      center: 'prev, title, next',
      right: ''
    },
    views: {
      day: {
        titleFormat: 'D MMM YYYY'
      }
    },
    events: [],
    selectable: true,
    selectOverlap: false,
    slotDuration: '00:30:00',
      selectHelper: true,
      longPressDelay: 100,
      select: (start, end) => {
        $('angular2-fullcalendar').fullCalendar('removeEvents');
        $('angular2-fullcalendar').fullCalendar('rerenderEvents');        
        var a = this.tempo.split(':');
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);       
        var title = this.servico;
        var eventData;
        if(start.isBefore(moment())) {
          this.toast.create({
            message: 'O horário selecionado já passou!',
            duration: 3000
          }).present();
          $('angular2-fullcalendar').fullCalendar('unselect');
          return false;
        }  
        if (title) {
          eventData = {
            title: title,
            start: start,
            end: moment(start).add(seconds, 'seconds')
          };
          $('angular2-fullcalendar').fullCalendar('renderEvent', eventData, true);
          console.log(eventData);
        }
        $('angular2-fullcalendar').fullCalendar('unselect');
      },
    dayClick: () => {
      //this.navCtrl.push(EventPage, {
        //let eventClient = $('angular2-fullcalendar').fullCalendar('clientEvents');
        //$('angular2-fullcalendar').fullCalendar('renderEvents', eventClient, true);
        console.log(this.servico);
        //console.log(eventClient);
      //});
    }
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  doFinal(){
    this.afAuth.authState.subscribe(user => {
      if(user){
        this.userId = user.uid;
        this.navCtrl.push(ReadyPage);
        console.log(this.details);
        console.log(this.userId);
        let eventClient = $('angular2-fullcalendar').fullCalendar('clientEvents');
        console.log(eventClient[0].start.toString());
        console.log(eventClient[0].end.toString());
        let inicio = eventClient[0].start.toString();
        let fim = eventClient[0].end.toString();
        let booking = {Empresa: this.empresa, Servico: this.servico, Preco: this.preco, Duracao: this.tempo, Profissional: this.profissional, dataInicio: inicio, dataFim: fim}

        this.db.list(`agendamentos/${this.userId}`).push(booking);
      } else{
        this.navCtrl.push(LoginPage);
        console.log(this.servico);
      }
    })
  }

}
