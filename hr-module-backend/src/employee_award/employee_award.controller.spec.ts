import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeAwardController } from './employee_award.controller';
import { EmployeeAwardService } from './employee_award.service';

describe('EmployeeAwardController', () => {
  let controller: EmployeeAwardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeAwardController],
      providers: [EmployeeAwardService],
    }).compile();

    controller = module.get<EmployeeAwardController>(EmployeeAwardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
