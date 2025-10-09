import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { MedicalFitnessCategoryService } from './medical_fitness_category.service';
import { CreateMedicalFitnessCategoryDto } from './dto/create-medical_fitness_category.dto';
import { UpdateMedicalFitnessCategoryDto } from './dto/update-medical_fitness_category.dto';

@Controller('medical_fitness_category')
export class MedicalFitnessCategoryController {
  constructor(private readonly medicalFitnessCategoryService: MedicalFitnessCategoryService) {}

  @Post()
  create(@Body(ValidationPipe) createMedicalFitnessCategoryDto: CreateMedicalFitnessCategoryDto) {
    return this.medicalFitnessCategoryService.create(createMedicalFitnessCategoryDto);
  }

  @Get()
  findAll() {
    return this.medicalFitnessCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicalFitnessCategoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateMedicalFitnessCategoryDto: UpdateMedicalFitnessCategoryDto) {
    return this.medicalFitnessCategoryService.update(id, updateMedicalFitnessCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicalFitnessCategoryService.remove(id);
  }
}
