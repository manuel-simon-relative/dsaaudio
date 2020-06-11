import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { sound } from '../../interface/sound';
import { playlist } from '../../interface/playlist';
import { relSoundList } from '../../interface/rel-sound-list';
import { db } from '../../service/db.service';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-playlistcard',
  templateUrl: './playlistcard.component.html',
  styleUrls: ['./playlistcard.component.sass']
})
export class PlaylistcardComponent implements OnInit {

  @Input() playlistIndex: number
  @Output() changePlaylistEvent = new EventEmitter<Number>();
  playlist: playlist
  countTitles: number = 0
  soundEffect1:String = ""
  soundEffect2:String = ""

  constructor() { }

  ngOnInit() {
    db.playlists.forEach(l => {
      if (l.id == this.playlistIndex) {
        this.playlist = l
      }
    })
    if (this.playlist.soundEffect1Desc != "" && this.playlist.soundEffect1Desc != undefined) { this.soundEffect1 = "Effekt 1: " + this.playlist.soundEffect1Desc}
    if (this.playlist.soundEffect2Desc != "" && this.playlist.soundEffect2Desc != undefined) { this.soundEffect2 = "Effekt 2: " + this.playlist.soundEffect2Desc}

    db.relations.forEach(r => {
      if (r.listid == this.playlistIndex) {
        db.sounds.forEach(s => {
          if (r.soundid == s.id) {
            this.countTitles++
          }
        })
      }
    })
  }

  onClickPlayListChange() {
    console.log("PlayListCard: Change to: " + this.playlistIndex)
    this.changePlaylistEvent.emit(this.playlistIndex)
  }


}


