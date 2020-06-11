import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './template/header/header.component';
import { PlayercontrolComponent } from './template/playercontrol/playercontrol.component';
import { ViewPlayComponent } from './template/view-play/view-play.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeyboardShortcutsModule } from "ng-keyboard-shortcuts";

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { PlaylistcardComponent } from './template/playlistcard/playlistcard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlayercontrolComponent,
    ViewPlayComponent,
    PlaylistcardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule,
    KeyboardShortcutsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
