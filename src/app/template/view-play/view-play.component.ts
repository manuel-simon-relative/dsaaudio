import { Component, OnInit, Output,EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-view-play',
  templateUrl: './view-play.component.html',
  styleUrls: ['./view-play.component.sass']
})
export class ViewPlayComponent implements OnInit {

  @Output() changePlaylistEvent = new EventEmitter<Number>();
  @Output() editPlaylistEvent = new EventEmitter<Number>();
  @Input() editMode: Boolean

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {

  }

  onClickPlaylistChange($event) {

    this.changePlaylistEvent.emit($event)
  }

  onClickEditPlaylist($event) {
    console.log('Edit: View: ' + $event)
    this.editPlaylistEvent.emit($event)
  }
}


