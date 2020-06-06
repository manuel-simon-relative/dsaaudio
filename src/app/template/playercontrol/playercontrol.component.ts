import { Component, OnInit } from '@angular/core';
import {Howl, Howler} from 'howler';
import { Sound } from '../../interface/sound';

@Component({
  selector: 'app-playercontrol',
  templateUrl: './playercontrol.component.html',
  styleUrls: ['./playercontrol.component.sass']
})
export class PlayercontrolComponent implements OnInit {
  
  sound1
  sound2
  shuffle:Boolean = true;
  loopSingle:Boolean = false;
  loopList:Boolean = true;
  comingTitles = []
  playedTitles = []
  actualSound = 1
  actualtitle:string = ""
  globalVolume = 0.5
  playlist2 = ["29 Jagdrevier.mp3", "30 Der Flussvater.mp3", "34 Tavernenlied.mp3"]
  playlist1 = ["01 Sacred.mp3","01 Skalitz 1403.mp3", "05 Beer And Women.mp3"]
  path = "../../../assets/mp3/"

  constructor() { }

  ngOnInit() {
    
    this.comingTitles = [];
    this.playlist1.forEach(e => {
      this.comingTitles.push(e)      
    });
    if (this.shuffle) {
      this.comingTitles.sort(function(a, b){return 0.5 - Math.random()});
    }

    this.sound1 = new Howl({
      src: this.path + this.comingTitles[0],
      onfade: this.sound1Fade()
      
    });
    this.actualtitle = this.comingTitles[0]
    this.playedTitles.push(this.comingTitles.shift())

    //this.sound1.play()
    //this.sound1.fade(0,1,3000);

  }

  sound1Fade(){
    console.log("Sound1Fade: aktuell soll spielen " + this.actualSound)
    if (this.actualSound != 1) {
      this.sound1.stop
      console.log('sound 1 gestoppt')
    }
  }

  sound2Fade(){
    console.log("Sound2Fade: aktuell soll spielen " + this.actualSound)
    if (this.actualSound != 2) {
      if (this.sound2 != undefined) {
        console.log('sound 2 gestopt')
        this.sound2.stop
      }
    }
  }

  onPlayPause() {
    if (this.actualSound == 1) {
      if (this.sound1.playing()) {
        this.sound1.pause()
        console.log('pause')
      } else {
        this.sound1.play()
        console.log('play')
      }
    } else {
      if (this.sound2.playing()) {
        this.sound2.pause()
        console.log('pause')
      } else {
        this.sound2.play()
        console.log('play')
      }
    }
  }

  onNext() {
    if (this.comingTitles.length>0) {
      if (this.actualSound == 1 ) {
        this.actualSound = 2;
        this.sound1.fade(this.globalVolume, 0, 3000);
        this.sound2 = new Howl({
          src: this.path + this.comingTitles[0],
          onfade: this.sound2Fade()
          
        })
        this.actualtitle = this.comingTitles[0]
        this.playedTitles.push(this.comingTitles.shift())
        console.log('nächster Titel: sound 2 : ' + this.actualtitle)
        this.sound2.play()
        this.sound2.fade(0,this.globalVolume,3000);
        
        console.log(this.comingTitles)
        console.log(this.playedTitles)
    } else {
      this.actualSound = 1;
      this.sound2.fade(this.globalVolume, 0, 3000);
      this.sound1 = new Howl({
        src: this.path + this.comingTitles[0],
        onfade: this.sound1Fade()
      })
      this.actualtitle = this.comingTitles[0]
      this.playedTitles.push(this.comingTitles.shift())
      console.log('nächster Titel: sound 1 : ' + this.actualtitle)
      this.sound1.play()
      this.sound1.fade(0,this.globalVolume,3000);
      
      console.log(this.comingTitles)
      console.log(this.playedTitles)
    }
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
    this.comingTitles = []
    this.playedTitles = []
    this.playlist2.forEach(e => {
      this.comingTitles.push(e)      
    });
    if (this.shuffle) {
      this.comingTitles.sort(function(a, b){return 0.5 - Math.random()});
    }
    this.onNext()
  }

  onKeyUp(event :any){
    console.log(event)
  }

}

