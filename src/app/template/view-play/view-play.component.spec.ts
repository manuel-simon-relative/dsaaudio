import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPlayComponent } from './view-play.component';

describe('ViewPlayComponent', () => {
  let component: ViewPlayComponent;
  let fixture: ComponentFixture<ViewPlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
