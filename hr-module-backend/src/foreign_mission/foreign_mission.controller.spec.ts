import { Test, TestingModule } from '@nestjs/testing';
import { ForeignMissionController } from './foreign_mission.controller';
import { ForeignMissionService } from './foreign_mission.service';

describe('ForeignMissionController', () => {
  let controller: ForeignMissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ForeignMissionController],
      providers: [ForeignMissionService],
    }).compile();

    controller = module.get<ForeignMissionController>(ForeignMissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
