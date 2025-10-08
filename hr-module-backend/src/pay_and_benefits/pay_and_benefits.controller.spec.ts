import { Test, TestingModule } from '@nestjs/testing';
import { PayAndBenefitsController } from './pay_and_benefits.controller';
import { PayAndBenefitsService } from './pay_and_benefits.service';

describe('PayAndBenefitsController', () => {
  let controller: PayAndBenefitsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayAndBenefitsController],
      providers: [PayAndBenefitsService],
    }).compile();

    controller = module.get<PayAndBenefitsController>(PayAndBenefitsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
