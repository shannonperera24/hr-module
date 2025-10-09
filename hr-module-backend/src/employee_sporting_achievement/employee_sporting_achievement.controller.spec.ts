import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeSportingAchievementController } from './employee_sporting_achievement.controller';
import { EmployeeSportingAchievementService } from './employee_sporting_achievement.service';

describe('EmployeeSportingAchievementController', () => {
  let controller: EmployeeSportingAchievementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeSportingAchievementController],
      providers: [EmployeeSportingAchievementService],
    }).compile();

    controller = module.get<EmployeeSportingAchievementController>(EmployeeSportingAchievementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
