import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { QualificationArmyTrainingCourseService } from './qualification_army_training_course.service';
import { CreateQualificationArmyTrainingCourseDto } from './dto/create-qualification_army_training_course.dto';
import { UpdateQualificationArmyTrainingCourseDto } from './dto/update-qualification_army_training_course.dto';

@Controller('qualification_army_training_course')
export class QualificationArmyTrainingCourseController {
  constructor(private readonly qualificationArmyTrainingCourseService: QualificationArmyTrainingCourseService) {}

  @Post()
  create(@Body(ValidationPipe) createQualificationArmyTrainingCourseDto: CreateQualificationArmyTrainingCourseDto) {
    return this.qualificationArmyTrainingCourseService.create(createQualificationArmyTrainingCourseDto);
  }

  @Get()
  findAll() {
    return this.qualificationArmyTrainingCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.qualificationArmyTrainingCourseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateQualificationArmyTrainingCourseDto: UpdateQualificationArmyTrainingCourseDto) {
    return this.qualificationArmyTrainingCourseService.update(id, updateQualificationArmyTrainingCourseDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.qualificationArmyTrainingCourseService.remove(id);
  }
}
