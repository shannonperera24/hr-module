import { Test, TestingModule } from '@nestjs/testing';
import { ArmyRankController } from './army_rank.controller';
import { ArmyRankService } from './army_rank.service';

describe('ArmyRankController', () => {
  let controller: ArmyRankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArmyRankController],
      providers: [ArmyRankService],
    }).compile();

    controller = module.get<ArmyRankController>(ArmyRankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
