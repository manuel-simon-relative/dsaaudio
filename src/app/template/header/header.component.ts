import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VirtualTimeScheduler } from 'rxjs';
import { analyzeFileForInjectables } from '@angular/compiler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  edit:Boolean = false
  @Output() toogleEditEvent = new EventEmitter<Boolean>();

  constructor() { }

  ngOnInit() {
  }

  onClickEditToggle() {
    if (this.edit) {
      this.edit = false
    } else {
      this.edit = true
    }
    console.log('bearbeiten: ' + this.edit)
    this.toogleEditEvent.emit(this.edit)


  }


}
