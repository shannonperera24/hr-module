import { Test, TestingModule } from '@nestjs/testing';
import { CivilQualificationController } from './civil_qualification.controller';
import { CivilQualificationService } from './civil_qualification.service';

describe('CivilQualificationController', () => {
  let controller: CivilQualificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CivilQualificationController],
      providers: [CivilQualificationService],
    }).compile();

    controller = module.get<CivilQualificationController>(CivilQualificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
