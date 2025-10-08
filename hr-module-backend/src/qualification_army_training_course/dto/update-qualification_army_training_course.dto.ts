import { PartialType } from '@nestjs/mapped-types';
import { CreateQualificationArmyTrainingCourseDto } from './create-qualification_army_training_course.dto';

export class UpdateQualificationArmyTrainingCourseDto extends PartialType(CreateQualificationArmyTrainingCourseDto) {}
