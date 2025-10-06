import { Test, TestingModule } from '@nestjs/testing';
import { SpecialDutyController } from './special_duty.controller';
import { SpecialDutyService } from './special_duty.service';

describe('SpecialDutyController', () => {
  let controller: SpecialDutyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialDutyController],
      providers: [SpecialDutyService],
    }).compile();

    controller = module.get<SpecialDutyController>(SpecialDutyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
