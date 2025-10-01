import { Test, TestingModule } from '@nestjs/testing';
import { CorpAndRegimentService } from './corp_and_regiment.service';

describe('CorpAndRegimentService', () => {
  let service: CorpAndRegimentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorpAndRegimentService],
    }).compile();

    service = module.get<CorpAndRegimentService>(CorpAndRegimentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
