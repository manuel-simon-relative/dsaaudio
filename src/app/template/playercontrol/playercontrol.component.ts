import { Component, OnInit,Input, AfterViewInit } from '@angular/core';
import {Howl, Howler} from 'howler';
import { sound } from '../../interface/sound';
import { playlist } from '../../interface/playlist';
import { relSoundList } from '../../interface/rel-sound-list';
import { db } from '../../service/db.service';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";


@Component({
  selector: 'app-playercontrol',
  templateUrl: './playercontrol.component.html',
  styleUrls: ['./playercontrol.component.sass']
})
export class PlayercontrolComponent implements OnInit , AfterViewInit{

  @Input() selectedPlaylist:number = 2

  withLog:Boolean = false
  title1
  title2
  isSoundEffect1: Boolean = false
  playSoundEffect1: Boolean = false
  soundEffect1Desc
  soundEffect1
  isSoundEffect2: Boolean = false
  playSoundEffect2: Boolean = false
  soundEffect2Desc
  soundEffect2
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
  shortcuts: ShortcutInput[] = [];

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
      if (this.title1 != undefined) {this.title1.fade(this.globalVolume, 0, 3000)}
      if (this.title2 != undefined) {this.title2.fade(this.globalVolume, 0, 3000)}
    }
    this.playNextTitle(false)
    //this.startPlaying()
    //this.playNextTitle(false)
      

    //this.actualTitle = this.comingTitles[0].songtitle
    //this.actualAlbum = this.comingTitles[0].album
    //this.playedTitles.push(this.comingTitles.shift())

    //load Soundeffects
    this.playSoundEffect1 = false
    this.playSoundEffect2 = false
    if (this.isSoundEffect1) {this.soundEffect1.stop()}
    if (this.isSoundEffect2) {this.soundEffect2.stop()}
    this.soundEffect1 = null
    this.soundEffect2 = null
    db.playlists.forEach(l => {
      if (l.id == this.selectedPlaylist) {
        if (l.soundEffect1Desc != undefined) {
          this.isSoundEffect1 = true
          this.soundEffect1Desc = l.soundEffect1Desc
          var self = this
          console.log("erstelle Soundeffect1")
          this.soundEffect1 = new Howl({
            src: this.path + "soundeffects/" + l.soundEffect1,
            onend: function() {self.soundEffect1Ends()},
            onfade: function() {self.soundEffect1Fade()}    

          })
        } else {
          this.isSoundEffect1 = false
          console.log("kein S1")
        }
        if (l.soundEffect2Desc != undefined) {
          this.isSoundEffect2 = true
          this.soundEffect2Desc = l.soundEffect2Desc
          console.log("erstelle Soundeffect2")
          var self = this
          this.soundEffect2 = new Howl({
            src: this.path + "soundeffects/" + l.soundEffect2,
            onend: function() {self.soundEffect2Ends()},
            onfade: function() {self.soundEffect2Fade()}   
          })
          console.log(this.soundEffect2)
        } else {
          this.isSoundEffect2 = false
          console.log("kein S2")
        }


      }
    })

  
    

  }

  soundEffect1Ends() {
    //was passiert beim enden des Effects
  }
  soundEffect2Ends() {
    //was passiert beim enden des Effects
  }

  soundEffect1Fade() {


  }
  soundEffect2Fade() {
    
  }

  onTooglePlaySoundEffect1() {
    if (this.playSoundEffect1) {
      this.playSoundEffect1 = false
      this.soundEffect1.fade(this.globalVolume-0.05, 0, 500)
    } else  {
      this.playSoundEffect1 = true
      this.soundEffect1.play()
      this.soundEffect1.fade(0, this.globalVolume-0.05, 500)
    }

  }
  onTooglePlaySoundEffect2() {
    if (this.playSoundEffect2) {
      this.playSoundEffect2 = false
      this.soundEffect2.fade(this.globalVolume-0.05, 0, 500)
    } else  {
      this.playSoundEffect2 = true
      this.soundEffect2.play()
      this.soundEffect2.fade(0, this.globalVolume-0.05, 500)
    }

  }



  startPlaying() {
    var self = this
    this.title1 = new Howl({
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
      this.title1.stop()
      console.log('sound 1 gestoppt')
    }
  }

  sound2Fade(){
    console.log("Sound2Fade: aktuell soll spielen " + this.actualSound)
    if (this.actualSound != 2) {
      if (this.title2 != undefined) {
        console.log('sound 2 gestopt')
        this.title2.stop()
      }
    }
  }

  onPlayPause() {
    if (this.actualSound == 1) {
      if (this.title1.playing()) {
        this.title1.pause()
        console.log('pause')
        this.playing = false
      } else {
        this.title1.play()
        this.playing = true
        console.log('play')
      }
    } else {
      if (this.title2.playing()) {
        this.title2.pause()
        this.playing = false
        console.log('pause')
      } else {
        this.title2.play()
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
      if (withfade) {this.title1.fade(this.globalVolume, 0, 3000);}
      this.title2 = null
      this.title2 = new Howl({
        src: this.path + this.comingTitles[0].file,
        onfade: function () {self.sound2Fade()},
        onend: function() {self.soundEnd()}
        
      })
      this.actualTitle = this.comingTitles[0].songtitle
      this.playedTitles.push(this.comingTitles.shift())
      console.log('nächster Titel: sound 2 : ' + this.actualTitle)
      if (this.playing) { 
        console.log('Titel geladen und gestartet')
        this.title2.play() } else { console.log('Titel geladen aber nicht gestartet') }
      this.title2.fade(0,this.globalVolume,3000);
      
      console.log(this.comingTitles)
      console.log(this.playedTitles)
  } else {
    this.actualSound = 1;
    if (withfade) {this.title2.fade(this.globalVolume, 0, 3000);}
    this.title1 = null
    this.title1 = new Howl({
      src: this.path + this.comingTitles[0].file,
      onfade: function() {self.sound1Fade()},
      onend: function() {self.soundEnd()}
    })
    this.actualTitle = this.comingTitles[0].songtitle
    this.playedTitles.push(this.comingTitles.shift())
    console.log('nächster Titel: sound 1 : ' + this.actualTitle)
    if (this.playing) { 
      console.log('Titel geladen und gestartet')
      this.title1.play() } else { console.log('Titel geladen aber nicht gestartet') }
    this.title1.fade(0,this.globalVolume,3000);
    
    console.log(this.comingTitles)
    console.log(this.playedTitles)
  }
    
}



  onVolumeUp(){
    if (this.globalVolume < 0.99) {
      if (this.actualSound == 1) { this.title1.fade(this.globalVolume, this.globalVolume+0.05, 500)}
      if (this.actualSound == 2) { this.title2.fade(this.globalVolume, this.globalVolume+0.05, 500)}
      if (this.isSoundEffect1) {this.soundEffect1.fade(this.globalVolume-0.05, this.globalVolume, 500)}
      if (this.isSoundEffect2) {this.soundEffect2.fade(this.globalVolume-0.05, this.globalVolume, 500)}
      this.globalVolume = this.globalVolume + 0.05
    }
  }

  onVolumeDown(){
    if (this.globalVolume > 0.1) {
      if (this.actualSound == 1) { this.title1.fade(this.globalVolume, this.globalVolume-0.05, 500)}
      if (this.actualSound == 2) { this.title2.fade(this.globalVolume, this.globalVolume-0.05, 500)}
      if (this.isSoundEffect1) {this.soundEffect1.fade(this.globalVolume-0.05, this.globalVolume-0.1, 500)}
      if (this.isSoundEffect2) {this.soundEffect2.fade(this.globalVolume-0.05, this.globalVolume-0.1, 500)}
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

onShuffle() {
  if (this.shuffle) {
    this.shuffle = false
  } else {
    this.shuffle = true
  }
}

  onKeyUp(event :any){
    console.log(event)
  }

  ngAfterViewInit() {
    this.shortcuts.push(
      {
        key: ["1"],
        label: "Playlist1",
        description: "Playlist1",
        command: e => console.log("Taste eins geklickt", { e }),
        preventDefault: true
      },
      {
        key: ["u"],
        label: "Volume Up",
        description: "Volume Up",
        command: () => this.onVolumeUp()
      },
      {
        key: ["d"],
        label: "Volume Down",
        description: "Volume Down",
        command: () => this.onVolumeDown()
      },
      {
        key: ["p"],
        label: "Play/Pause",
        description: "PlayPause",
        command: () => this.onPlayPause(),
        preventDefault: true
      },
      {
        key: ["n"],
        label: "next",
        command: () => this.onNext(),
        preventDefault: true
      }
      
    );
    
  }

}

