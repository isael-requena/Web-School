import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-homeworks-details',
  templateUrl: './homeworks-details.component.html',
  styleUrls: ['./homeworks-details.component.scss'],
})
export class HomeworksDetailsComponent  implements OnInit {
  @Output() closeEmit = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  onCloseEvent() {
    this.closeEmit.emit(false);
  }

}
