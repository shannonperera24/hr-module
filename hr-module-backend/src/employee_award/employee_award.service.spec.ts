import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeAwardService } from './employee_award.service';

describe('EmployeeAwardService', () => {
  let service: EmployeeAwardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeAwardService],
    }).compile();

    service = module.get<EmployeeAwardService>(EmployeeAwardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
