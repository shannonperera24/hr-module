import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeAllowanceService } from './employee_allowance.service';

describe('EmployeeAllowanceService', () => {
  let service: EmployeeAllowanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeAllowanceService],
    }).compile();

    service = module.get<EmployeeAllowanceService>(EmployeeAllowanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
