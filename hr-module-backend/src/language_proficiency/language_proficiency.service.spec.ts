import { Test, TestingModule } from '@nestjs/testing';
import { LanguageProficiencyService } from './language_proficiency.service';

describe('LanguageProficiencyService', () => {
  let service: LanguageProficiencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LanguageProficiencyService],
    }).compile();

    service = module.get<LanguageProficiencyService>(LanguageProficiencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
