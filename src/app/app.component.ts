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

  onClickPlaylistChange($event) {
    this.selectedPlaylist = $event
  }
  onClickEditMode($event) {
    console.log('app: ' + $event)
    this.editMode = $event
  }
}
