import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userEditGuard } from './user-edit.guard';

describe('userEditGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userEditGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
