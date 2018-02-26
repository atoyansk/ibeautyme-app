import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover';
import * as $ from 'jquery';
import * as moment from "moment";


@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage {

  details = this.navParams.data.detail;
  servico = this.navParams.data.detail.nServico;
  tempo = this.navParams.data.detail.tServico + ":00";

  initialLocaleCode = 'pt-br';

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController) {
  
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
      select: (start, end) => {
        $('angular2-fullcalendar').fullCalendar('removeEvents');
        $('angular2-fullcalendar').fullCalendar('rerenderEvents');        
        var a = this.tempo.split(':');
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);       
        var title = this.servico;
        var eventData;
        if(start.isBefore(moment())) {
          alert("Invalid Time");
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
        console.log(this.servico);
      //});
    }
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
