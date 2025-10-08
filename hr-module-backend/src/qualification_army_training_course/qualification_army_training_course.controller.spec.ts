import { Test, TestingModule } from '@nestjs/testing';
import { QualificationArmyTrainingCourseController } from './qualification_army_training_course.controller';
import { QualificationArmyTrainingCourseService } from './qualification_army_training_course.service';

describe('QualificationArmyTrainingCourseController', () => {
  let controller: QualificationArmyTrainingCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QualificationArmyTrainingCourseController],
      providers: [QualificationArmyTrainingCourseService],
    }).compile();

    controller = module.get<QualificationArmyTrainingCourseController>(QualificationArmyTrainingCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
