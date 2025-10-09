import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CommendationService } from './commendation.service';
import { CreateCommendationDto } from './dto/create-commendation.dto';
import { UpdateCommendationDto } from './dto/update-commendation.dto';

@Controller('commendation')
export class CommendationController {
  constructor(private readonly commendationService: CommendationService) {}

  @Post()
  create(@Body(ValidationPipe) createCommendationDto: CreateCommendationDto) {
    return this.commendationService.create(createCommendationDto);
  }

  @Get()
  findAll() {
    return this.commendationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commendationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateCommendationDto: UpdateCommendationDto) {
    return this.commendationService.update(id, updateCommendationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.commendationService.remove(id);
  }
}
