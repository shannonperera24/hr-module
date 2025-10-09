import { Test, TestingModule } from '@nestjs/testing';
import { ForeignMissionService } from './foreign_mission.service';

describe('ForeignMissionService', () => {
  let service: ForeignMissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ForeignMissionService],
    }).compile();

    service = module.get<ForeignMissionService>(ForeignMissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
