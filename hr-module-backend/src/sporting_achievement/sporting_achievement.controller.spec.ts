import { Test, TestingModule } from '@nestjs/testing';
import { SportingAchievementController } from './sporting_achievement.controller';
import { SportingAchievementService } from './sporting_achievement.service';

describe('SportingAchievementController', () => {
  let controller: SportingAchievementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SportingAchievementController],
      providers: [SportingAchievementService],
    }).compile();

    controller = module.get<SportingAchievementController>(SportingAchievementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
