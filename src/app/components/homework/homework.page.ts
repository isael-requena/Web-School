import { Component, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-homework',
  templateUrl: './homework.page.html',
  styleUrls: ['./homework.page.scss'],
})
export class HomeworkComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() id: number | undefined;

  constructor() { }

  ngOnInit() {}

  onLabelClick($event: { preventDefault: () => void; }) {
    $event.preventDefault();
    console.log('clcick');
  }

}
