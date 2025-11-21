import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { MedicalAndHealthRecordService } from './medical_and_health_record.service';
import { CreateMedicalAndHealthRecordDto } from './dto/create-medical_and_health_record.dto';
import { UpdateMedicalAndHealthRecordDto } from './dto/update-medical_and_health_record.dto';

@Controller('medical_and_health_record')
export class MedicalAndHealthRecordController {
  constructor(private readonly medicalAndHealthRecordService: MedicalAndHealthRecordService) {}

  @Post()
  create(@Body(ValidationPipe) createMedicalAndHealthRecordDto: CreateMedicalAndHealthRecordDto) {
    return this.medicalAndHealthRecordService.create(createMedicalAndHealthRecordDto);
  }

  @Get()
  findAll() {
    return this.medicalAndHealthRecordService.findAll();
  }

  //dashboard
  @Get('stats/fitness-pie')
  getFitnessPie() {
    return this.medicalAndHealthRecordService.getFitnessCategoryStats();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.medicalAndHealthRecordService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateMedicalAndHealthRecordDto: UpdateMedicalAndHealthRecordDto) {
    return this.medicalAndHealthRecordService.update(id, updateMedicalAndHealthRecordDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.medicalAndHealthRecordService.remove(id);
  }
}
