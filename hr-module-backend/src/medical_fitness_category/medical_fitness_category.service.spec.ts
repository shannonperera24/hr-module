import { Test, TestingModule } from '@nestjs/testing';
import { MedicalFitnessCategoryService } from './medical_fitness_category.service';

describe('MedicalFitnessCategoryService', () => {
  let service: MedicalFitnessCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicalFitnessCategoryService],
    }).compile();

    service = module.get<MedicalFitnessCategoryService>(MedicalFitnessCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
