import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {HomePage} from './home.page'
import { HomePageRoutingModule } from './home-routing.module';
import {HomeworkComponent} from '../../components/homework/homework.page';
// import { NewHomeworkComponent } from '../../components/new-homework/new-homework.page';
import { HomeworksDetailsComponent } from '../../components/homeworks-details/homeworks-details.component';
import { CreateHomeworkComponent } from '../../components/create-homework/create-homework.component'

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
    // NewHomeworkComponent,
    HomeworksDetailsComponent,
    CreateHomeworkComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
