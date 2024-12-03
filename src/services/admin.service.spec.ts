import { TestBed } from '@angular/core/testing';

import { AdministradoresService } from './admin.service'; // Actualiza la importación

describe('AdministradoresService', () => {
  let service: AdministradoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministradoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
