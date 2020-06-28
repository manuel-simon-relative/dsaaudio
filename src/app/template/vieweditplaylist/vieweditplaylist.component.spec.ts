import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VieweditplaylistComponent } from './vieweditplaylist.component';

describe('VieweditplaylistComponent', () => {
  let component: VieweditplaylistComponent;
  let fixture: ComponentFixture<VieweditplaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VieweditplaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VieweditplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
