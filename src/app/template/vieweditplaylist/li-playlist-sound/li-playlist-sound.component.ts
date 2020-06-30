import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { sound } from '../../../interface/sound';

@Component({
  selector: 'app-li-playlist-sound',
  templateUrl: './li-playlist-sound.component.html',
  styleUrls: ['./li-playlist-sound.component.sass']
})
export class LiPlaylistSoundComponent implements OnInit {

  @Input() sound
  @Input() playing: Boolean = false
  @Input() childisplaying: Number = -1
  @Input() left:Boolean = true

  @Output() tooglePlayEvent = new EventEmitter<Number>()
  @Output() shiftElementEvent = new EventEmitter<Number>()

  constructor() { }

  ngOnInit() {
    console.log(this.left)
    
  }

  ngOnChanges() {


  }

  onClickPlay() {
    console.log('bitte spiele Sound: ' + this.sound.id)
    this.tooglePlayEvent.emit(this.sound.id)
  }

}
