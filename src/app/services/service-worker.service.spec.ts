import { TestBed } from '@angular/core/testing';

import { ServiceWorkerService } from './service-worker.service';

describe('ServiceWorkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceWorkerService = TestBed.get(ServiceWorkerService);
    expect(service).toBeTruthy();
  });
});
