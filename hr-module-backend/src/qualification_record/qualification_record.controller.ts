import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { QualificationRecordService } from './qualification_record.service';
import { CreateQualificationRecordDto } from './dto/create-qualification_record.dto';
import { UpdateQualificationRecordDto } from './dto/update-qualification_record.dto';

@Controller('qualification_record')
export class QualificationRecordController {
  constructor(private readonly qualificationRecordService: QualificationRecordService) {}

  @Post()
  create(@Body(ValidationPipe) createQualificationRecordDto: CreateQualificationRecordDto) {
    return this.qualificationRecordService.create(createQualificationRecordDto);
  }

  @Get()
  findAll() {
    return this.qualificationRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.qualificationRecordService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateQualificationRecordDto: UpdateQualificationRecordDto) {
    return this.qualificationRecordService.update(id, updateQualificationRecordDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.qualificationRecordService.remove(id);
  }
}
