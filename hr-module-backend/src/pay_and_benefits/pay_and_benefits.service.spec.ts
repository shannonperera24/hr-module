import { Test, TestingModule } from '@nestjs/testing';
import { PayAndBenefitsService } from './pay_and_benefits.service';

describe('PayAndBenefitsService', () => {
  let service: PayAndBenefitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayAndBenefitsService],
    }).compile();

    service = module.get<PayAndBenefitsService>(PayAndBenefitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
