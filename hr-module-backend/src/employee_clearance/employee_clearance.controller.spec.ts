import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeClearanceController } from './employee_clearance.controller';
import { EmployeeClearanceService } from './employee_clearance.service';

describe('EmployeeClearanceController', () => {
  let controller: EmployeeClearanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeClearanceController],
      providers: [EmployeeClearanceService],
    }).compile();

    controller = module.get<EmployeeClearanceController>(EmployeeClearanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
