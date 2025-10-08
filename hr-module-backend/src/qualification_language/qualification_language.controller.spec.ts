import { Test, TestingModule } from '@nestjs/testing';
import { QualificationLanguageController } from './qualification_language.controller';
import { QualificationLanguageService } from './qualification_language.service';

describe('QualificationLanguageController', () => {
  let controller: QualificationLanguageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QualificationLanguageController],
      providers: [QualificationLanguageService],
    }).compile();

    controller = module.get<QualificationLanguageController>(QualificationLanguageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
