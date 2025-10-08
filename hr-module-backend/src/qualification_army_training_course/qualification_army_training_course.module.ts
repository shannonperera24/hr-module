import { Module } from '@nestjs/common';
import { QualificationArmyTrainingCourseService } from './qualification_army_training_course.service';
import { QualificationArmyTrainingCourseController } from './qualification_army_training_course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualificationArmyTrainingCourse } from './entities/qualification_army_training_course.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QualificationArmyTrainingCourse])],
  controllers: [QualificationArmyTrainingCourseController],
  providers: [QualificationArmyTrainingCourseService],
})
export class QualificationArmyTrainingCourseModule {}
