import { Component, OnInit ,ViewChild } from '@angular/core';
import { Content, IonicPage, NavController, NavParams } from 'ionic-angular';
import { CalendarService} from '../../services/calendar/calendar.service'

@IonicPage()
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  providers: [CalendarService],
})
export class CalendarPage implements OnInit {
    eventSource = [];
    viewTitle;
  
    calendar = {
      mode: 'month',
      currentDate: new Date(),
    };
    selectedDate = new Date();
  constructor(
  ) {
  }
  ngOnInit() {
  }
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    this.selectedDate = ev.selectedTime;
  }

  onCurrentDateChanged(event: Date) {
    console.log('current date change: ' + event);
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  today() {
    this.calendar.currentDate = new Date();
  }

}
