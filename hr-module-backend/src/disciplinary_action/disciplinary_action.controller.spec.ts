import { Test, TestingModule } from '@nestjs/testing';
import { DisciplinaryActionController } from './disciplinary_action.controller';
import { DisciplinaryActionService } from './disciplinary_action.service';

describe('DisciplinaryActionController', () => {
  let controller: DisciplinaryActionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DisciplinaryActionController],
      providers: [DisciplinaryActionService],
    }).compile();

    controller = module.get<DisciplinaryActionController>(DisciplinaryActionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
