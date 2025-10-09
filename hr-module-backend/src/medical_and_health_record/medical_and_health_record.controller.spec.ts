import { Test, TestingModule } from '@nestjs/testing';
import { MedicalAndHealthRecordController } from './medical_and_health_record.controller';
import { MedicalAndHealthRecordService } from './medical_and_health_record.service';

describe('MedicalAndHealthRecordController', () => {
  let controller: MedicalAndHealthRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalAndHealthRecordController],
      providers: [MedicalAndHealthRecordService],
    }).compile();

    controller = module.get<MedicalAndHealthRecordController>(MedicalAndHealthRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
