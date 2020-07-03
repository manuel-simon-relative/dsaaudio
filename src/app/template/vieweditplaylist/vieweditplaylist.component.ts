import { Component, OnInit, Input } from '@angular/core';
import { sound } from '../../interface/sound';
import { playlist } from '../../interface/playlist';
import { relSoundList } from '../../interface/rel-sound-list';
import { db } from '../../service/db.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-vieweditplaylist',
  templateUrl: './vieweditplaylist.component.html',
  styleUrls: ['./vieweditplaylist.component.sass']
})
export class VieweditplaylistComponent implements OnInit {

  @Input() playlistIndex: number
  SongsInPlaylist = []
  SongsNotInPlaylist = []
  SearchedList = []
  filteredList =[]
  childplaying:Number = -1
  playing:Boolean = false
  searchstring:String = ''

  filter: number = -2 //-2: keinen Filter / -1: Lieder keiner Liste / ansonsten Lieder mit der Playlistnummer

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
    this.createChoosingList()

  }

  shiftSound(sound: sound, isInPlaylist: Boolean) {
    if (isInPlaylist) {
      for (var index = 0; index < db.relations.length; index++) {
        if (db.relations[index].listid == this.playlistIndex && db.relations[index].soundid == sound.id) {
          db.relations.splice(index, 1);
        }
    }
    for (var index = 0; index < this.SongsInPlaylist.length; index++) {
      if (this.SongsInPlaylist[index] == sound) {
        this.SongsNotInPlaylist.push(this.SongsInPlaylist.splice(index,1))
      }
    }
  } else {
    var maxUIDRelation:number = 0;
    db.relations.forEach(r => {
      maxUIDRelation = Math.max(r.id, maxUIDRelation)
    })
    var newRel: relSoundList = ({
      id: maxUIDRelation+1,
      soundid: sound.id,
      listid: this.playlistIndex 
    })
    db.relations.push(newRel)
    for (var index:number; index < this.SongsNotInPlaylist.length; index++) {
      if (this.SongsNotInPlaylist[index] == sound) {
        this.SongsInPlaylist.push(this.SongsNotInPlaylist.splice(index,1))
      }
    }
  }
  this.createChoosingList()
}

  createChoosingList() {
    //erst Filtern der Ursprungsliste
    this.filteredList = []
    if (this.filter == -2) {
      console.log('ich soll keine Titel Filtern')
      this.SongsNotInPlaylist.forEach(song => {
        this.filteredList.push(song)        
      });
    }

    if (this.filter == -1) {
      var songNotInAList:Boolean = true
      this.SongsNotInPlaylist.forEach(song => {
        songNotInAList = true
        db.relations.forEach(relation => {
          if (relation.soundid == song.id) {
            songNotInAList = false
          }          
        });
        if (songNotInAList) {
          this.filteredList.push(song)
        } 
      });
      console.log('ich soll alle Lieder zeigen, welche in keiner Liste sind')
    }
    if (this.filter >= 0) {
      console.log('ich soll alle Lieder zeigen, welche der Liste zugeordnet sind: ' + this.filter)
      this.SongsNotInPlaylist.forEach(song => {
        db.relations.forEach(relation => {
          if (relation.soundid == song.id && relation.listid == this.filter ) {
            this.filteredList.push(song)
            console.log(song)
          }
        });      
      });
    }
    this.SearchedList = []
    //filterung abgeschlossen
    //jetzt wird nach Suchstring gefiltert
    if (this.searchstring == "") {
      this.filteredList.forEach(song => {
        this.SearchedList.push(song)
        
      });
    }  else {
      //hier wird wirklich gesucht
      
      var lowercasedSearchString = this.searchstring.toLowerCase()
      var positionList = []
      console.log('ich suche nach: ' + lowercasedSearchString)
      for (var index = 0; index < this.filteredList.length; index++) {
        var indexOf
        var indexOfAlbum = this.filteredList[index].album.toLowerCase().indexOf(lowercasedSearchString)
        var indexOfSongtitle = this.filteredList[index].songtitle.toLowerCase().indexOf(lowercasedSearchString)
        if (indexOfSongtitle != -1 && indexOfAlbum != -1) {
          indexOf = Math.min(indexOfAlbum,indexOfSongtitle)
        } else {
          indexOf = Math.max(indexOfAlbum, indexOfSongtitle)
        }

        console.log(index + ' : ' + indexOf)
        positionList.push( indexOf)
      }
      for (var run = 0 ; run < 50 ; run++) {
        for (var index = 0; index < this.filteredList.length; index++) {
          if (positionList[index] == run) {
            this.SearchedList.push(this.filteredList[index])
          }
        }
      }

    }

  }

  onKeyUpSearchfield() {
    console.log('Textfeld wurde geändert')
    this.onTooglePlaySound(-1)
    this.createChoosingList()
  }

  onTooglePlaySound($event) {
    if ($event == -1) {
      console.log('ich soll gar nichts spielen')
      this.childplaying = -1
      this.playing = false
    } else {
      console.log('ich soll Sound ' + $event + ' abspielen')
      if (this.childplaying == $event) {
        if (this.playing) {
          console.log('Song: ' + $event + ' wird angehalten')
          this.playing = false
        } else {
          console.log('Song: ' + $event + ' wird fortgesetzt')
          this.playing = true
        }
        
      } else  {
        console.log('Song: ' + this.childplaying + ' wird angehalten und Song: ' + $event + ' wird gespielt')
        this.childplaying = $event
        this.playing = true
      }
    }

  }

  onClickFilter(List:number) {
    if (this.filter==List) {
      this.filter = -2
    } else {
      this.filter = List
    }
    this.createChoosingList()

  }

}
