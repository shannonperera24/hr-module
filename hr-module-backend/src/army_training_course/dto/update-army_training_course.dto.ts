import { PartialType } from '@nestjs/mapped-types';
import { CreateArmyTrainingCourseDto } from './create-army_training_course.dto';

export class UpdateArmyTrainingCourseDto extends PartialType(CreateArmyTrainingCourseDto) {}
