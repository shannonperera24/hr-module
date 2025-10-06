import { Test, TestingModule } from '@nestjs/testing';
import { CourtMartialRecordService } from './court_martial_record.service';

describe('CourtMartialRecordService', () => {
  let service: CourtMartialRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourtMartialRecordService],
    }).compile();

    service = module.get<CourtMartialRecordService>(CourtMartialRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
