import { Test, TestingModule } from '@nestjs/testing';
import { QualificationComputerSkillService } from './qualification_computer_skill.service';

describe('QualificationComputerSkillService', () => {
  let service: QualificationComputerSkillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QualificationComputerSkillService],
    }).compile();

    service = module.get<QualificationComputerSkillService>(QualificationComputerSkillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
