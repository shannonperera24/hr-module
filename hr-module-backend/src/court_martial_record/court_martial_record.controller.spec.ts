import { Test, TestingModule } from '@nestjs/testing';
import { CourtMartialRecordController } from './court_martial_record.controller';
import { CourtMartialRecordService } from './court_martial_record.service';

describe('CourtMartialRecordController', () => {
  let controller: CourtMartialRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourtMartialRecordController],
      providers: [CourtMartialRecordService],
    }).compile();

    controller = module.get<CourtMartialRecordController>(CourtMartialRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
