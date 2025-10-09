import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { SportingAchievementService } from './sporting_achievement.service';
import { CreateSportingAchievementDto } from './dto/create-sporting_achievement.dto';
import { UpdateSportingAchievementDto } from './dto/update-sporting_achievement.dto';

@Controller('sporting_achievement')
export class SportingAchievementController {
  constructor(private readonly sportingAchievementService: SportingAchievementService) {}

  @Post()
  create(@Body(ValidationPipe) createSportingAchievementDto: CreateSportingAchievementDto) {
    return this.sportingAchievementService.create(createSportingAchievementDto);
  }

  @Get()
  findAll() {
    return this.sportingAchievementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sportingAchievementService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateSportingAchievementDto: UpdateSportingAchievementDto) {
    return this.sportingAchievementService.update(id, updateSportingAchievementDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sportingAchievementService.remove(id);
  }
}
