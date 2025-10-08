import { Test, TestingModule } from '@nestjs/testing';
import { QualificationHasCivilController } from './qualification_has_civil.controller';
import { QualificationHasCivilService } from './qualification_has_civil.service';

describe('QualificationHasCivilController', () => {
  let controller: QualificationHasCivilController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QualificationHasCivilController],
      providers: [QualificationHasCivilService],
    }).compile();

    controller = module.get<QualificationHasCivilController>(QualificationHasCivilController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
