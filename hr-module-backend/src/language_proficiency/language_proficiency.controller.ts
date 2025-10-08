import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { LanguageProficiencyService } from './language_proficiency.service';
import { CreateLanguageProficiencyDto } from './dto/create-language_proficiency.dto';
import { UpdateLanguageProficiencyDto } from './dto/update-language_proficiency.dto';

@Controller('language_proficiency')
export class LanguageProficiencyController {
  constructor(private readonly languageProficiencyService: LanguageProficiencyService) {}

  @Post()
  create(@Body(ValidationPipe) createLanguageProficiencyDto: CreateLanguageProficiencyDto) {
    return this.languageProficiencyService.create(createLanguageProficiencyDto);
  }

  @Get()
  findAll() {
    return this.languageProficiencyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.languageProficiencyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateLanguageProficiencyDto: UpdateLanguageProficiencyDto) {
    return this.languageProficiencyService.update(id, updateLanguageProficiencyDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.languageProficiencyService.remove(id);
  }
}
