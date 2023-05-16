import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { TaskComponent } from '../components/task/task.component';
import { NewTaskComponent } from '../components/new-task/new-task.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [HomePage, TaskComponent, NewTaskComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
