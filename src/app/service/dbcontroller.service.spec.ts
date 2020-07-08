import { TestBed } from '@angular/core/testing';

import { DbcontrolService } from './dbcontroller.service';

describe('DbcontrollerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbcontrolService = TestBed.get(DbcontrolService);
    expect(service).toBeTruthy();
  });
});
