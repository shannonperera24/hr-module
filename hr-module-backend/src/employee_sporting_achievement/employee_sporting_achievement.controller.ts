import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { EmployeeSportingAchievementService } from './employee_sporting_achievement.service';
import { CreateEmployeeSportingAchievementDto } from './dto/create-employee_sporting_achievement.dto';
import { UpdateEmployeeSportingAchievementDto } from './dto/update-employee_sporting_achievement.dto';

@Controller('employee_sporting_achievement')
export class EmployeeSportingAchievementController {
  constructor(private readonly employeeSportingAchievementService: EmployeeSportingAchievementService) {}

  @Post()
  create(@Body(ValidationPipe) createEmployeeSportingAchievementDto: CreateEmployeeSportingAchievementDto) {
    return this.employeeSportingAchievementService.create(createEmployeeSportingAchievementDto);
  }

  @Get()
  findAll() {
    return this.employeeSportingAchievementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeeSportingAchievementService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateEmployeeSportingAchievementDto: UpdateEmployeeSportingAchievementDto) {
    return this.employeeSportingAchievementService.update(id, updateEmployeeSportingAchievementDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeeSportingAchievementService.remove(id);
  }
}
