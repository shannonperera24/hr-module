import { Test, TestingModule } from '@nestjs/testing';
import { CorpAndRegimentController } from './corp_and_regiment.controller';
import { CorpAndRegimentService } from './corp_and_regiment.service';

describe('CorpAndRegimentController', () => {
  let controller: CorpAndRegimentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorpAndRegimentController],
      providers: [CorpAndRegimentService],
    }).compile();

    controller = module.get<CorpAndRegimentController>(CorpAndRegimentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
