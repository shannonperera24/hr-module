import { Test, TestingModule } from '@nestjs/testing';
import { ArmyTrainingCourseService } from './army_training_course.service';

describe('ArmyTrainingCourseService', () => {
  let service: ArmyTrainingCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArmyTrainingCourseService],
    }).compile();

    service = module.get<ArmyTrainingCourseService>(ArmyTrainingCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
