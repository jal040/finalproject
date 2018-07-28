import { TestBed, inject } from '@angular/core/testing';

import { StockApiDataService } from './stock-api-data.service';

describe('StockApiDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockApiDataService]
    });
  });

  it('should be created', inject([StockApiDataService], (service: StockApiDataService) => {
    expect(service).toBeTruthy();
  }));
});
