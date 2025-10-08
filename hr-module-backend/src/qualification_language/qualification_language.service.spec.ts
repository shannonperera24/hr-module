import { Test, TestingModule } from '@nestjs/testing';
import { QualificationLanguageService } from './qualification_language.service';

describe('QualificationLanguageService', () => {
  let service: QualificationLanguageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QualificationLanguageService],
    }).compile();

    service = module.get<QualificationLanguageService>(QualificationLanguageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
