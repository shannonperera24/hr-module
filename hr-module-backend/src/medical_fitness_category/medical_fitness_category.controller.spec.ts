import { Test, TestingModule } from '@nestjs/testing';
import { MedicalFitnessCategoryController } from './medical_fitness_category.controller';
import { MedicalFitnessCategoryService } from './medical_fitness_category.service';

describe('MedicalFitnessCategoryController', () => {
  let controller: MedicalFitnessCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicalFitnessCategoryController],
      providers: [MedicalFitnessCategoryService],
    }).compile();

    controller = module.get<MedicalFitnessCategoryController>(MedicalFitnessCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
