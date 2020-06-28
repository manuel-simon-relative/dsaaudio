import { Component, OnInit, Input } from '@angular/core';
import { sound } from '../../interface/sound';
import { playlist } from '../../interface/playlist';
import { relSoundList } from '../../interface/rel-sound-list';
import { db } from '../../service/db.service';

@Component({
  selector: 'app-vieweditplaylist',
  templateUrl: './vieweditplaylist.component.html',
  styleUrls: ['./vieweditplaylist.component.sass']
})
export class VieweditplaylistComponent implements OnInit {

  @Input() playlistIndex: Number
  SongsInPlaylist = []
  SongsNotInPlaylist = []

  constructor() { }

  ngOnInit() {
    db.sounds.forEach(s => {
      var inList:Boolean = false;
      db.relations.forEach(r => {
        if (r.listid == this.playlistIndex) {
          if (r.soundid == s.id) {
            inList = true
          }
        }
        
      });
      if (inList) {
        console.log(s.songtitle + " ist in der Liste")
        this.SongsInPlaylist.push(s)
      } else {
        console.log(s.songtitle + " ist nicht in der Liste")
        this.SongsNotInPlaylist.push(s)
      }
    });

  }

}
