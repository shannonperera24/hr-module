import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { QualificationHasCivilService } from './qualification_has_civil.service';
import { CreateQualificationHasCivilDto } from './dto/create-qualification_has_civil.dto';
import { UpdateQualificationHasCivilDto } from './dto/update-qualification_has_civil.dto';

@Controller('qualification_has_civil')
export class QualificationHasCivilController {
  constructor(private readonly qualificationHasCivilService: QualificationHasCivilService) {}

  @Post()
  create(@Body(ValidationPipe) createQualificationHasCivilDto: CreateQualificationHasCivilDto) {
    return this.qualificationHasCivilService.create(createQualificationHasCivilDto);
  }

  @Get()
  findAll() {
    return this.qualificationHasCivilService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.qualificationHasCivilService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateQualificationHasCivilDto: UpdateQualificationHasCivilDto) {
    return this.qualificationHasCivilService.update(id, updateQualificationHasCivilDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.qualificationHasCivilService.remove(id);
  }
}
