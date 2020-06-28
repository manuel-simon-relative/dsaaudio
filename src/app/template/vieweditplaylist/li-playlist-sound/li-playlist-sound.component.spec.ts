import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiPlaylistSoundComponent } from './li-playlist-sound.component';

describe('LiPlaylistSoundComponent', () => {
  let component: LiPlaylistSoundComponent;
  let fixture: ComponentFixture<LiPlaylistSoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiPlaylistSoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiPlaylistSoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
