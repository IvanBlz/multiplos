import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { SharedModule } from '@shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { MultiplosModule } from './multiplos/multiplos.module';
import { multiploReducer } from './multiplos/multiplo.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    HomeRoutingModule,
    StoreModule.forRoot({ value: multiploReducer, multiplosDto: multiploReducer }),
    MultiplosModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
