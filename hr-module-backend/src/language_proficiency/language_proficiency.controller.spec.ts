import { Test, TestingModule } from '@nestjs/testing';
import { LanguageProficiencyController } from './language_proficiency.controller';
import { LanguageProficiencyService } from './language_proficiency.service';

describe('LanguageProficiencyController', () => {
  let controller: LanguageProficiencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LanguageProficiencyController],
      providers: [LanguageProficiencyService],
    }).compile();

    controller = module.get<LanguageProficiencyController>(LanguageProficiencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
