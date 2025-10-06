import { Test, TestingModule } from '@nestjs/testing';
import { OverseasPostingService } from './overseas_posting.service';

describe('OverseasPostingService', () => {
  let service: OverseasPostingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OverseasPostingService],
    }).compile();

    service = module.get<OverseasPostingService>(OverseasPostingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
