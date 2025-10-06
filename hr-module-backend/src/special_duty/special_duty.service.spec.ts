import { Test, TestingModule } from '@nestjs/testing';
import { SpecialDutyService } from './special_duty.service';

describe('SpecialDutyService', () => {
  let service: SpecialDutyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialDutyService],
    }).compile();

    service = module.get<SpecialDutyService>(SpecialDutyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
