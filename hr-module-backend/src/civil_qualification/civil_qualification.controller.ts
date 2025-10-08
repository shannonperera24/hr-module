import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CivilQualificationService } from './civil_qualification.service';
import { CreateCivilQualificationDto } from './dto/create-civil_qualification.dto';
import { UpdateCivilQualificationDto } from './dto/update-civil_qualification.dto';

@Controller('civil_qualification')
export class CivilQualificationController {
  constructor(private readonly civilQualificationService: CivilQualificationService) {}

  @Post()
  create(@Body(ValidationPipe) createCivilQualificationDto: CreateCivilQualificationDto) {
    return this.civilQualificationService.create(createCivilQualificationDto);
  }

  @Get()
  findAll() {
    return this.civilQualificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.civilQualificationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateCivilQualificationDto: UpdateCivilQualificationDto) {
    return this.civilQualificationService.update(id, updateCivilQualificationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.civilQualificationService.remove(id);
  }
}
