import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeSportingAchievementService } from './employee_sporting_achievement.service';

describe('EmployeeSportingAchievementService', () => {
  let service: EmployeeSportingAchievementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeSportingAchievementService],
    }).compile();

    service = module.get<EmployeeSportingAchievementService>(EmployeeSportingAchievementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
