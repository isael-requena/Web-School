import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ComingSoonPageRoutingModule } from './coming-soon-routing.module';
import {ComingSoonPage} from './coming-soon.page'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComingSoonPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    ComingSoonPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComingSoonPageModule {}
