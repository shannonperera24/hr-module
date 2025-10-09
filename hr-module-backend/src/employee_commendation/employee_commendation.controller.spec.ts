import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeCommendationController } from './employee_commendation.controller';
import { EmployeeCommendationService } from './employee_commendation.service';

describe('EmployeeCommendationController', () => {
  let controller: EmployeeCommendationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeCommendationController],
      providers: [EmployeeCommendationService],
    }).compile();

    controller = module.get<EmployeeCommendationController>(EmployeeCommendationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
