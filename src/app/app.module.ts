import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './template/header/header.component';
import { PlayercontrolComponent } from './template/playercontrol/playercontrol.component';
import { ViewPlayComponent } from './template/view-play/view-play.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeyboardShortcutsModule } from "ng-keyboard-shortcuts";
import { FormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatInputModule} from '@angular/material/input';

import { PlaylistcardComponent } from './template/playlistcard/playlistcard.component';
import { VieweditplaylistComponent } from './template/vieweditplaylist/vieweditplaylist.component';
import { LiPlaylistSoundComponent } from './template/vieweditplaylist/li-playlist-sound/li-playlist-sound.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlayercontrolComponent,
    ViewPlayComponent,
    PlaylistcardComponent,
    VieweditplaylistComponent,
    LiPlaylistSoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatInputModule,
    KeyboardShortcutsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
