import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeForeignMissionController } from './employee_foreign_mission.controller';
import { EmployeeForeignMissionService } from './employee_foreign_mission.service';

describe('EmployeeForeignMissionController', () => {
  let controller: EmployeeForeignMissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeForeignMissionController],
      providers: [EmployeeForeignMissionService],
    }).compile();

    controller = module.get<EmployeeForeignMissionController>(EmployeeForeignMissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
