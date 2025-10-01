import { Test, TestingModule } from '@nestjs/testing';
import { ArmyRankService } from './army_rank.service';

describe('ArmyRankService', () => {
  let service: ArmyRankService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArmyRankService],
    }).compile();

    service = module.get<ArmyRankService>(ArmyRankService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
