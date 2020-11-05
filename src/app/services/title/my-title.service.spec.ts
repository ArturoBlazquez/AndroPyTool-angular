import { TestBed } from '@angular/core/testing';

import { MyTitleService } from './my-title.service';

describe('MyTitleService', () => {
  let service: MyTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
