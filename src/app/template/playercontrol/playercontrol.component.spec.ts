import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayercontrolComponent } from './playercontrol.component';

describe('PlayercontrolComponent', () => {
  let component: PlayercontrolComponent;
  let fixture: ComponentFixture<PlayercontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayercontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayercontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
