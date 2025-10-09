import { Test, TestingModule } from '@nestjs/testing';
import { MedicalHistoryController } from './medical_history.controller';
import { MedicalHistoryService } from './medical_history.service';

describe('MedicalHistoryController', () => {
  let controller: MedicalHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalHistoryController],
      providers: [MedicalHistoryService],
    }).compile();

    controller = module.get<MedicalHistoryController>(MedicalHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
