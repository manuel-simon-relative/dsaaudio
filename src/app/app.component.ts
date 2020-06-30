import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'dsaaudio';
  selectedPlaylist = 0
  editMode: Boolean = false;
  viewcontrol: Number = 1;
  editPlaylistNumber: Number = 1;

  onClickPlaylistChange($event) {
    this.selectedPlaylist = $event
  }
  onClickEditPlaylist($event) {
    console.log('es soll Playlist ' + $event + ' geändert werden -> setze Werte')
    this.editPlaylistNumber = $event
    this.viewcontrol = 1
  }
  onClickEditMode($event) {
    console.log('app: ' + $event)
    this.editMode = $event
  }
}
