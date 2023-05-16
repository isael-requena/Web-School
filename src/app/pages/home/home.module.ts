import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {HomePage} from './home.page'
import { HomePageRoutingModule } from './home-routing.module';
import {HomeworkComponent} from '../../components/homework/homework.page';
import { NewHomeworkComponent } from '../../components/new-homework/new-homework.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomePage,
    HomeworkComponent,
    NewHomeworkComponent,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
