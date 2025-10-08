import { Test, TestingModule } from '@nestjs/testing';
import { QualificationArmyTrainingCourseService } from './qualification_army_training_course.service';

describe('QualificationArmyTrainingCourseService', () => {
  let service: QualificationArmyTrainingCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QualificationArmyTrainingCourseService],
    }).compile();

    service = module.get<QualificationArmyTrainingCourseService>(QualificationArmyTrainingCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
