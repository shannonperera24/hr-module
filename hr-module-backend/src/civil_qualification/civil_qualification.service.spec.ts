import { Test, TestingModule } from '@nestjs/testing';
import { CivilQualificationService } from './civil_qualification.service';

describe('CivilQualificationService', () => {
  let service: CivilQualificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CivilQualificationService],
    }).compile();

    service = module.get<CivilQualificationService>(CivilQualificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
