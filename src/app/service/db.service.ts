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
    shuffle: true ,
    soundEffect1: "Markt.mp3",
    soundEffect1Desc: "Marktgeräusche"

   },
   {
     id: 3,
     name: "Taverne",
     desc: "Lieder für die Taverne/Marktfeier",
     loop: true,
     shuffle: true ,
     soundEffect1: "Menschen.mp3",
     soundEffect1Desc: "Menschenansammlung"
    },
    {
     id: 4,
     name: "Natur Tag",
     desc: "Tage in der Natur/Wiesen/kleine Dörfer",
     loop: true,
     shuffle: true ,
     soundEffect1: "Naturgeräusche.mp3",
     soundEffect1Desc: "Vögel und Tiere"  ,
     soundEffect2: "Regen.mp3",
     soundEffect2Desc: "Regen"   
    },
    {
      id: 5,
      name: "Natur Nacht",
      desc: "Lieder für Nächte in der Natur",
      loop: true,
      shuffle: true,
      soundEffect1: "Nachtgeräusche.mp3",
      soundEffect1Desc: "Nachtgeräusche"  ,
      soundEffect2: "Regen.mp3",
      soundEffect2Desc: "Regen"     
     },
     {
      id: 6,
      name: "Kampf",
      desc: "Lieder für Kampf,Flucht, Tumult",
      loop: true,
      shuffle: true,
      soundEffect1: "Kampf.mp3",
      soundEffect1Desc: "Kampfeslärm"  ,    
     },
     {
       id: 7,
       name: "Flucht/Bedrohlich",
       desc: "Lieder für zuspitzende Situationen/Spannung",
       loop: true,
       shuffle: true    
      },
      {
       id: 8,
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
    songtitle: "Jagdrevier",
    hint: false
  },
  {
    id: 1,
    file:  "30 Der Flussvater.mp3",
    album: "Drakensang am Fluss der Zeit",
    songtitle: "Der Flussvater",
    hint: false
  },
  {
    id: 2,
    file:  "34 Tavernenlied.mp3",
    album: "Drakensang am Fluss der Zeit",
    songtitle: "Tavernenlied",
    hint: false
  },
  {
    id: 3,
    file: "01 Sacred.mp3",
    album: "Sacred 2",
    songtitle: "Sacred",
    hint: false
  },
  {
    id: 4,
    file:  "01 Skalitz 1403.mp3",
    album: "Soundtrack - Kingdome Come: Deliverance",
    songtitle: "Skalitz 1403",
    hint: false
  },
  {
    id: 5,
    file:  "05 Beer And Women.mp3",
    album: "Soundtrack - Kingdome Come: Deliverance",
    songtitle: "Beer and Women",
    hint: false
  }
]

  constructor() { }
}
