import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeAllowanceController } from './employee_allowance.controller';
import { EmployeeAllowanceService } from './employee_allowance.service';

describe('EmployeeAllowanceController', () => {
  let controller: EmployeeAllowanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeAllowanceController],
      providers: [EmployeeAllowanceService],
    }).compile();

    controller = module.get<EmployeeAllowanceController>(EmployeeAllowanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
