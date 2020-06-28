import { Component, OnInit, Output,EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-view-play',
  templateUrl: './view-play.component.html',
  styleUrls: ['./view-play.component.sass']
})
export class ViewPlayComponent implements OnInit {

  @Output() changePlaylistEvent = new EventEmitter<Number>();
  @Input() editMode: Boolean

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    
  }

  onClickPlaylistChange($event) {
    console.log($event)
    this.changePlaylistEvent.emit($event)
  }
}


