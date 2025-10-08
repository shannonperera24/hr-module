import { Test, TestingModule } from '@nestjs/testing';
import { ArmyTrainingCourseController } from './army_training_course.controller';
import { ArmyTrainingCourseService } from './army_training_course.service';

describe('ArmyTrainingCourseController', () => {
  let controller: ArmyTrainingCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArmyTrainingCourseController],
      providers: [ArmyTrainingCourseService],
    }).compile();

    controller = module.get<ArmyTrainingCourseController>(ArmyTrainingCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
