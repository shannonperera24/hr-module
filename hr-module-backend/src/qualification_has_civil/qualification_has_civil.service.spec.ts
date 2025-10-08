import { Test, TestingModule } from '@nestjs/testing';
import { QualificationHasCivilService } from './qualification_has_civil.service';

describe('QualificationHasCivilService', () => {
  let service: QualificationHasCivilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QualificationHasCivilService],
    }).compile();

    service = module.get<QualificationHasCivilService>(QualificationHasCivilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
