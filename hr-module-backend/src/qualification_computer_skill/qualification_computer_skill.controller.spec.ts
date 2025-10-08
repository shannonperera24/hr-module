import { Test, TestingModule } from '@nestjs/testing';
import { QualificationComputerSkillController } from './qualification_computer_skill.controller';
import { QualificationComputerSkillService } from './qualification_computer_skill.service';

describe('QualificationComputerSkillController', () => {
  let controller: QualificationComputerSkillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QualificationComputerSkillController],
      providers: [QualificationComputerSkillService],
    }).compile();

    controller = module.get<QualificationComputerSkillController>(QualificationComputerSkillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
