import { Injectable } from '@angular/core';
import { playlist } from '../interface/playlist';
import { sound } from '../interface/sound';
import { relSoundList } from '../interface/rel-sound-list';

@Injectable({
  providedIn: 'root'
})
export class db {

  public static relations: Array<relSoundList> = [{
    id:0,
    soundid: 3,
    listid: 0
  },
  {
    id:1,
    soundid: 1,
    listid: 1
  },
  {
    id:2,
    soundid: 4,
    listid: 1
  },
  {
    id:3,
    soundid: 5,
    listid: 2
  },
  {
    id:4,
    soundid: 2,
    listid: 2
  },
  {
    id:5,
    soundid: 0,
    listid: 2
  },
]

  public static playlists: Array<playlist> = [{
    id: 0,
    name: "Opener",
    desc: "DSA-Opener",
    loop: false,
    shuffle: false    
  },
  {
    id: 1,
    name: "Rekapitulation",
    desc: "Lieder für die Rekapitulation",
    loop: true,
    shuffle: true    
   },
   {
    id: 2,
    name: "Stadt",
    desc: "Lieder für Stadt, Taverne",
    loop: true,
    shuffle: true    
   }

  ]

  public static sounds: Array<sound> = [{
    id: 0,
    file: "29 Jagdrevier.mp3",
    album: "Drakensang am Fluss der Zeit",
    songtitle: "Jagdrevier"
  },
  {
    id: 1,
    file:  "30 Der Flussvater.mp3",
    album: "Drakensang am Fluss der Zeit",
    songtitle: "Der Flussvater"
  },
  {
    id: 2,
    file:  "34 Tavernenlied.mp3",
    album: "Drakensang am Fluss der Zeit",
    songtitle: "Tavernenlied"
  },
  {
    id: 3,
    file: "01 Sacred.mp3",
    album: "Sacred 2",
    songtitle: "Sacred"
  },
  {
    id: 4,
    file:  "01 Skalitz 1403.mp3",
    album: "Soundtrack - Kingdome Come: Deliverance",
    songtitle: "Skalitz 1403"
  },
  {
    id: 5,
    file:  "05 Beer And Women.mp3",
    album: "Soundtrack - Kingdome Come: Deliverance",
    songtitle: "Beer and Women"
  }
]

  constructor() { }
}
