import { Test, TestingModule } from '@nestjs/testing';
import { ComputerSkillController } from './computer_skill.controller';
import { ComputerSkillService } from './computer_skill.service';

describe('ComputerSkillController', () => {
  let controller: ComputerSkillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComputerSkillController],
      providers: [ComputerSkillService],
    }).compile();

    controller = module.get<ComputerSkillController>(ComputerSkillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
