import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ArmyTrainingCourseService } from './army_training_course.service';
import { CreateArmyTrainingCourseDto } from './dto/create-army_training_course.dto';
import { UpdateArmyTrainingCourseDto } from './dto/update-army_training_course.dto';

@Controller('army_training_course')
export class ArmyTrainingCourseController {
  constructor(private readonly armyTrainingCourseService: ArmyTrainingCourseService) {}

  @Post()
  create(@Body(ValidationPipe) createArmyTrainingCourseDto: CreateArmyTrainingCourseDto) {
    return this.armyTrainingCourseService.create(createArmyTrainingCourseDto);
  }

  @Get()
  findAll() {
    return this.armyTrainingCourseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.armyTrainingCourseService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateArmyTrainingCourseDto: UpdateArmyTrainingCourseDto) {
    return this.armyTrainingCourseService.update(id, updateArmyTrainingCourseDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.armyTrainingCourseService.remove(id);
  }
}
