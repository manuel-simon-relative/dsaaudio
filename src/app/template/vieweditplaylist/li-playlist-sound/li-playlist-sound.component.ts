import { Component, OnInit, Input } from '@angular/core';
import { sound } from '../../../interface/sound';

@Component({
  selector: 'app-li-playlist-sound',
  templateUrl: './li-playlist-sound.component.html',
  styleUrls: ['./li-playlist-sound.component.sass']
})
export class LiPlaylistSoundComponent implements OnInit {

  @Input() sound

  constructor() { }

  ngOnInit() {
    console.log(this.sound)
    
  }

}
