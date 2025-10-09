import { Test, TestingModule } from '@nestjs/testing';
import { MedicalAndHealthRecordService } from './medical_and_health_record.service';

describe('MedicalAndHealthRecordService', () => {
  let service: MedicalAndHealthRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalAndHealthRecordService],
    }).compile();

    service = module.get<MedicalAndHealthRecordService>(MedicalAndHealthRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
