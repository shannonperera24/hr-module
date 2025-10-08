import { Test, TestingModule } from '@nestjs/testing';
import { ComputerSkillService } from './computer_skill.service';

describe('ComputerSkillService', () => {
  let service: ComputerSkillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComputerSkillService],
    }).compile();

    service = module.get<ComputerSkillService>(ComputerSkillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
