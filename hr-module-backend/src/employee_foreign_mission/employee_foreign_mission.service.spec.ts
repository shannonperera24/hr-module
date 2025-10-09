import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeForeignMissionService } from './employee_foreign_mission.service';

describe('EmployeeForeignMissionService', () => {
  let service: EmployeeForeignMissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeForeignMissionService],
    }).compile();

    service = module.get<EmployeeForeignMissionService>(EmployeeForeignMissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
