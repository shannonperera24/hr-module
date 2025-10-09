import { Test, TestingModule } from '@nestjs/testing';
import { CommendationService } from './commendation.service';

describe('CommendationService', () => {
  let service: CommendationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommendationService],
    }).compile();

    service = module.get<CommendationService>(CommendationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
