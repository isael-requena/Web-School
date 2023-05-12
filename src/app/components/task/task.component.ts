import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {

  @Input() title: string;
  @Input() id: number;

  constructor() { }

  ngOnInit() {}

  onLabelClick($event) {
    event.preventDefault();
    console.log('clcick');
  }

}
