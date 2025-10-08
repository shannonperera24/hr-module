import { Test, TestingModule } from '@nestjs/testing';
import { QualificationRecordController } from './qualification_record.controller';
import { QualificationRecordService } from './qualification_record.service';

describe('QualificationRecordController', () => {
  let controller: QualificationRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QualificationRecordController],
      providers: [QualificationRecordService],
    }).compile();

    controller = module.get<QualificationRecordController>(QualificationRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
