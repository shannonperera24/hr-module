import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeCommendationService } from './employee_commendation.service';

describe('EmployeeCommendationService', () => {
  let service: EmployeeCommendationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeCommendationService],
    }).compile();

    service = module.get<EmployeeCommendationService>(EmployeeCommendationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
