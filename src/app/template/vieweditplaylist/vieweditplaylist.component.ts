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
  childplaying:Number = -1
  playing:Boolean = false
  searchstring:String = ''

  filterOne = 0
  filterTwo = 0
  filterThree = 0
  filterFour = 0
  filterFive = 0
  filterSix = 0
  filterSeven = 0
  filterEight = 0
  filterNine = 0

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

  onKeyUpSearchfield() {
    console.log('Textfeld wurde geändert')
    this.onTooglePlaySound(-1)
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

  onClickFilter(List:Number) {
    switch(List) {
      case 1:
        if (this.filterOne == 1) {
          this.filterOne = -1
        } else {
          this.filterOne = this.filterOne+1
        }
        break;
      case 2:
        if (this.filterTwo == 1) {
          this.filterTwo = -1
        } else {
          this.filterTwo = this.filterTwo+1
        }
        break;
      case 3:
        if (this.filterThree == 1) {
          this.filterThree = -1
        } else {
          this.filterThree = this.filterThree+1
        }
        break;
      case 4:
        if (this.filterFour == 1) {
          this.filterFour = -1
        } else {
          this.filterFour = this.filterFour+1
        }
        break;
      case 5:
        if (this.filterFive == 1) {
          this.filterFive = -1
        } else {
          this.filterFive = this.filterFive+1
        }
        break;
        case 6:
          if (this.filterSix == 1) {
            this.filterSix = -1
          } else {
            this.filterSix = this.filterSix+1
          }
          break;
        case 7:
          if (this.filterSeven == 1) {
            this.filterSeven = -1
          } else {
            this.filterSeven = this.filterSeven+1
          }
          break;
        case 8:
          if (this.filterEight == 1) {
            this.filterEight = -1
          } else {
            this.filterEight = this.filterEight+1
          }
          break;
        case 9:
          if (this.filterNine == 1) {
            this.filterNine = -1
          } else {
            this.filterNine = this.filterNine+1
          }
          break;
          
      default:
        // code block
    }

  }

}
