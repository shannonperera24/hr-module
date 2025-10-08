import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { QualificationLanguageService } from './qualification_language.service';
import { CreateQualificationLanguageDto } from './dto/create-qualification_language.dto';
import { UpdateQualificationLanguageDto } from './dto/update-qualification_language.dto';

@Controller('qualification_language')
export class QualificationLanguageController {
  constructor(private readonly qualificationLanguageService: QualificationLanguageService) {}

  @Post()
  create(@Body(ValidationPipe) createQualificationLanguageDto: CreateQualificationLanguageDto) {
    return this.qualificationLanguageService.create(createQualificationLanguageDto);
  }

  @Get()
  findAll() {
    return this.qualificationLanguageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.qualificationLanguageService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateQualificationLanguageDto: UpdateQualificationLanguageDto) {
    return this.qualificationLanguageService.update(id, updateQualificationLanguageDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.qualificationLanguageService.remove(id);
  }
}
