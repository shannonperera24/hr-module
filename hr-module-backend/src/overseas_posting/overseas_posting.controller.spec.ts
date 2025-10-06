import { Test, TestingModule } from '@nestjs/testing';
import { OverseasPostingController } from './overseas_posting.controller';
import { OverseasPostingService } from './overseas_posting.service';

describe('OverseasPostingController', () => {
  let controller: OverseasPostingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OverseasPostingController],
      providers: [OverseasPostingService],
    }).compile();

    controller = module.get<OverseasPostingController>(OverseasPostingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
