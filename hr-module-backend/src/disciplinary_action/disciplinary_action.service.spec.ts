import { Test, TestingModule } from '@nestjs/testing';
import { DisciplinaryActionService } from './disciplinary_action.service';

describe('DisciplinaryActionService', () => {
  let service: DisciplinaryActionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisciplinaryActionService],
    }).compile();

    service = module.get<DisciplinaryActionService>(DisciplinaryActionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
