import { Test, TestingModule } from '@nestjs/testing';
import { QualificationRecordService } from './qualification_record.service';

describe('QualificationRecordService', () => {
  let service: QualificationRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QualificationRecordService],
    }).compile();

    service = module.get<QualificationRecordService>(QualificationRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
