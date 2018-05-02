import { TestBed, inject } from '@angular/core/testing';

import { CategoryCommonService } from './category-common.service';

describe('CategoryCommonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryCommonService]
    });
  });

  it('should be created', inject([CategoryCommonService], (service: CategoryCommonService) => {
    expect(service).toBeTruthy();
  }));
});
