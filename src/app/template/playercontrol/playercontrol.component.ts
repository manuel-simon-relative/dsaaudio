import { Component, OnInit,Input } from '@angular/core';
import {Howl, Howler} from 'howler';
import { sound } from '../../interface/sound';
import { playlist } from '../../interface/playlist';
import { relSoundList } from '../../interface/rel-sound-list';
import { db } from '../../service/db.service';

@Component({
  selector: 'app-playercontrol',
  templateUrl: './playercontrol.component.html',
  styleUrls: ['./playercontrol.component.sass']
})
export class PlayercontrolComponent implements OnInit {

  @Input() selectedPlaylist:number = 2

  withLog:Boolean = false
  sound1
  sound2
  playing: Boolean = false;
  shuffle:Boolean = true;
  loopSingle:Boolean = false;
  loopList:Boolean = false;

  playlistTitle: String = ""
  comingTitles = []
  playedTitles = []
  actualSound = 2
  actualTitle: String = ""
  actualAlbum: String = ""
  globalVolume = 0.5
  path = "../../../assets/mp3/"
  playlistCange:Boolean = false

  constructor() { }

  ngOnInit() {
    



  }

  ngOnChanges() {
    this.playlistCange =true;
    this.comingTitles = new Array()
    this.playedTitles = new Array()
    if (this.withLog) {console.log('Liste für folgende Titel wird gelöscht')}
    
    //Titel und Einstellungen der Playlist finden
    if (this.withLog) {console.log('Titel der ausgewählten Playlist wird gesucht und Einstellungen für die Playlist werden gesetzt.')}
    db.playlists.forEach(l => {
      if (l.id == this.selectedPlaylist) {
        if (this.withLog) {console.log('Playliste zur id ' + l.id + ' gefunden')}
        this.playlistTitle = l.name
        if (this.withLog) {console.log('Titel der Liste wird auf ' + l.name + ' gesetzt.')}
        this.loopList = l.loop
        if (this.withLog) {console.log('Loop für Playliste: ' + l.loop)}
        this.shuffle = l.shuffle
        if (this.withLog) {console.log('Shuffle für Playliste: ' + l.shuffle)}
        this.loopSingle = false;
      }
    })

    //Lieder der Playlist suchen
    if (this.withLog) {console.log('Lieder für Playliste werden gesucht')}
    db.relations.forEach(r => {
      if (r.listid == this.selectedPlaylist) {
        if (this.withLog) {console.log('Passende Relation gefunden: ' + r.id)}
        db.sounds.forEach(s => {
          if (r.soundid == s.id) {
            if (this.withLog) {console.log('Passendes Lied gefunden: ' + s.id)}
            this.comingTitles.push(s)
            if (this.withLog) {console.log('Lied an Listen angehangen: ' + s.songtitle)}
          }
        })
      }
    })
    if (this.shuffle) {
      if (this.withLog) {console.log('Playlist wird geshuffled')}
      this.comingTitles.sort(function(a, b){return 0.5 - Math.random()});
    }
    if (this.playlistCange) {
      if (this.sound1 != undefined) {this.sound1.fade(this.globalVolume, 0, 3000)}
      if (this.sound2 != undefined) {this.sound2.fade(this.globalVolume, 0, 3000)}
    }
    this.playNextTitle(false)
    //this.startPlaying()
    //this.playNextTitle(false)
      

    //this.actualTitle = this.comingTitles[0].songtitle
    //this.actualAlbum = this.comingTitles[0].album
    //this.playedTitles.push(this.comingTitles.shift())
  
    

  }

  startPlaying() {
    var self = this
    this.sound1 = new Howl({
      src: this.path + this.comingTitles[0].file,
      onfade: function() {self.sound1Fade()},
      onend: function() {self.soundEnd()}
    })

  }


  soundEnd(){

    if (this.loopSingle) {
      //einzelner Titel soll gelooped werden, daher letzten Title nochmal
      this.comingTitles.unshift(this.playedTitles.pop())
      this.playNextTitle(false)
    } else {
      if (this.comingTitles.length == 0) {
        //Wiedergabeliste ist leer
        if (this.loopList) {
          //die Liste soll gelooped werden, daher alles aus played nach comming
          this.playedTitles.forEach(t => {
            this.comingTitles.push(t)
          })
          this.playedTitles = []
          //shufflen, falls nötig
          if (this.shuffle) {
            if (this.withLog) {console.log('Playlist wird geshuffled')}
            this.comingTitles.sort(function(a, b){return 0.5 - Math.random()});
          }
          this.playNextTitle(false)
        } else {
          //kein loop eingestellt, wiedergabeliste leer, sound abspielen
        }
      } else {
        //WIedergabeliste ist nicht leer, daher einfach nächsten titel abspielen
        this.playNextTitle(false)
      }
    }
  
    
  }

  sound1Fade(){
    console.log("Sound1Fade: aktuell soll spielen " + this.actualSound)
    if (this.actualSound != 1) {
      this.sound1.stop()
      console.log('sound 1 gestoppt')
    }
  }

  sound2Fade(){
    console.log("Sound2Fade: aktuell soll spielen " + this.actualSound)
    if (this.actualSound != 2) {
      if (this.sound2 != undefined) {
        console.log('sound 2 gestopt')
        this.sound2.stop()
      }
    }
  }

  onPlayPause() {
    if (this.actualSound == 1) {
      if (this.sound1.playing()) {
        this.sound1.pause()
        console.log('pause')
        this.playing = false
      } else {
        this.sound1.play()
        this.playing = true
        console.log('play')
      }
    } else {
      if (this.sound2.playing()) {
        this.sound2.pause()
        this.playing = false
        console.log('pause')
      } else {
        this.sound2.play()
        this.playing = true
        console.log('play')
      }
    }
  }

  onNext() {
    console.log('onNext wird aufgrufen')
    if (this.comingTitles.length == 0) {
      console.log('WIedergabe liste ist leer')
      if (this.loopList) {
        console.log('es muss gelooped werden')
        //Loop ist aktiv, daher Liste neu aufsetzen
        this.playedTitles.forEach(t => {
          this.comingTitles.push(t)
        })
        this.playedTitles = []
        //shufflen, falls notwenidig
        if (this.shuffle) {
          if (this.withLog) {console.log('Playlist wird geshuffled')}
          this.comingTitles.sort(function(a, b){return 0.5 - Math.random()});
        }

        //nächsten Titel abspielen
        this.playNextTitle(true)
      } else {
        //kein Loop aktiv, nichts mehr zum abspielen
        //Hinweiston abspielen
      }

      
  } else {
    this.playNextTitle(true)
  }
  }

  onToggleLoopList(){
    if (this.loopList) {
      this.loopList = false;
      this.loopSingle = false;
    } else {
      this.loopList = true;
    }
  }

  onToggleLoopSingle(){
    if (this.loopSingle) {
      this.loopSingle = false;
    } else {
      this.loopSingle = true;
    }
  }


  playNextTitle(withfade) {
    var self  = this
    if (this.actualSound == 1 ) {
      this.actualSound = 2;
      if (withfade) {this.sound1.fade(this.globalVolume, 0, 3000);}
      this.sound2 = null
      this.sound2 = new Howl({
        src: this.path + this.comingTitles[0].file,
        onfade: function () {self.sound2Fade()},
        onend: function() {self.soundEnd()}
        
      })
      this.actualTitle = this.comingTitles[0].songtitle
      this.playedTitles.push(this.comingTitles.shift())
      console.log('nächster Titel: sound 2 : ' + this.actualTitle)
      if (this.playing) { 
        console.log('Titel geladen und gestartet')
        this.sound2.play() } else { console.log('Titel geladen aber nicht gestartet') }
      this.sound2.fade(0,this.globalVolume,3000);
      
      console.log(this.comingTitles)
      console.log(this.playedTitles)
  } else {
    this.actualSound = 1;
    if (withfade) {this.sound2.fade(this.globalVolume, 0, 3000);}
    this.sound1 = null
    this.sound1 = new Howl({
      src: this.path + this.comingTitles[0].file,
      onfade: function() {self.sound1Fade()},
      onend: function() {self.soundEnd()}
    })
    this.actualTitle = this.comingTitles[0].songtitle
    this.playedTitles.push(this.comingTitles.shift())
    console.log('nächster Titel: sound 1 : ' + this.actualTitle)
    if (this.playing) { 
      console.log('Titel geladen und gestartet')
      this.sound1.play() } else { console.log('Titel geladen aber nicht gestartet') }
    this.sound1.fade(0,this.globalVolume,3000);
    
    console.log(this.comingTitles)
    console.log(this.playedTitles)
  }
    
}



  onVolumeUp(){
    if (this.globalVolume < 1) {
      if (this.actualSound == 1) { this.sound1.fade(this.globalVolume, this.globalVolume+0.05, 500)}
      if (this.actualSound == 2) { this.sound2.fade(this.globalVolume, this.globalVolume+0.05, 500)}
      this.globalVolume = this.globalVolume + 0.05
    }
  }

  onVolumeDown(){
    if (this.globalVolume > 0) {
      if (this.actualSound == 1) { this.sound1.fade(this.globalVolume, this.globalVolume-0.05, 500)}
      if (this.actualSound == 2) { this.sound2.fade(this.globalVolume, this.globalVolume-0.05, 500)}
      this.globalVolume = this.globalVolume - 0.05
    }
  }

  onNextPlaylist() {
    this.selectedPlaylist = 2
    this.comingTitles = []
    this.playedTitles = []
    
    //Titel und Einstellungen der Playlist finden
    db.playlists.forEach(l => {
      if (l.id == this.selectedPlaylist) {
        this.playlistTitle = l.name
        console.log(this.playlistTitle)
        this.loopList = l.loop
        this.shuffle = l.shuffle
        this.loopSingle = false;
      }
    })

    //Lieder der Playlist suchen
    db.relations.forEach(r => {
      db.sounds.forEach(s => {
        if (r.listid == this.selectedPlaylist) {
          if (r.soundid == s.id) {
            this.comingTitles.push(s)
          }
        }
      })
    })

    if (this.shuffle) {
      this.comingTitles.sort(function(a, b){return 0.5 - Math.random()});
    
    this.onNext()
  }
}

  onKeyUp(event :any){
    console.log(event)
  }

}

