import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeckComponent } from './deck/deck.component';
import { AddComponent } from './add/add.component';
import { BrowseComponent } from './browse/browse.component';
import { StatsComponent } from './stats/stats.component';
import { CardComponent } from './card/card.component';
import { StudyComponent } from './study/study.component';

import { ApiService } from './services/api.service';
import { DeckService } from './services/deck.service';
import { StudyService } from './services/study.service';

@NgModule({
  declarations: [
    AppComponent,
    DeckComponent,
    AddComponent,
    BrowseComponent,
    StatsComponent,
    CardComponent,
    StudyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighchartsChartModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ApiService,
    DeckService,
    StudyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
