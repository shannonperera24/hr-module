import { Module } from '@nestjs/common';
import { ArmyTrainingCourseService } from './army_training_course.service';
import { ArmyTrainingCourseController } from './army_training_course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArmyTrainingCourse } from './entities/army_training_course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArmyTrainingCourse])],
  controllers: [ArmyTrainingCourseController],
  providers: [ArmyTrainingCourseService],
})
export class ArmyTrainingCourseModule {}
