import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistcardComponent } from './playlistcard.component';

describe('PlaylistcardComponent', () => {
  let component: PlaylistcardComponent;
  let fixture: ComponentFixture<PlaylistcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
