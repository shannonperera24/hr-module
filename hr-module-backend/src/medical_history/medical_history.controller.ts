import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { MedicalHistoryService } from './medical_history.service';
import { CreateMedicalHistoryDto } from './dto/create-medical_history.dto';
import { UpdateMedicalHistoryDto } from './dto/update-medical_history.dto';

@Controller('medical_history')
export class MedicalHistoryController {
  constructor(private readonly medicalHistoryService: MedicalHistoryService) {}

  @Post()
  create(@Body(ValidationPipe) createMedicalHistoryDto: CreateMedicalHistoryDto) {
    return this.medicalHistoryService.create(createMedicalHistoryDto);
  }

  @Get()
  findAll() {
    return this.medicalHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicalHistoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateMedicalHistoryDto: UpdateMedicalHistoryDto) {
    return this.medicalHistoryService.update(id, updateMedicalHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicalHistoryService.remove(id);
  }
}
