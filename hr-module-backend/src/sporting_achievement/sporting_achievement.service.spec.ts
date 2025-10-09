import { Test, TestingModule } from '@nestjs/testing';
import { SportingAchievementService } from './sporting_achievement.service';

describe('SportingAchievementService', () => {
  let service: SportingAchievementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SportingAchievementService],
    }).compile();

    service = module.get<SportingAchievementService>(SportingAchievementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
