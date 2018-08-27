import { TestBed, inject } from '@angular/core/testing';
import { DashboardapiService } from './services/dashboardapiservice/dashboardapi.service';



describe('DashboardapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardapiService]
    });
  });

  it('should be created', inject([DashboardapiService], (service: DashboardapiService) => {
    expect(service).toBeTruthy();
  }));
});
