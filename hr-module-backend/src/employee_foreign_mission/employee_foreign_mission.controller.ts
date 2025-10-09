import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { EmployeeForeignMissionService } from './employee_foreign_mission.service';
import { CreateEmployeeForeignMissionDto } from './dto/create-employee_foreign_mission.dto';
import { UpdateEmployeeForeignMissionDto } from './dto/update-employee_foreign_mission.dto';

@Controller('employee_foreign_mission')
export class EmployeeForeignMissionController {
  constructor(private readonly employeeForeignMissionService: EmployeeForeignMissionService) {}

  @Post()
  create(@Body(ValidationPipe) createEmployeeForeignMissionDto: CreateEmployeeForeignMissionDto) {
    return this.employeeForeignMissionService.create(createEmployeeForeignMissionDto);
  }

  @Get()
  findAll() {
    return this.employeeForeignMissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeeForeignMissionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateEmployeeForeignMissionDto: UpdateEmployeeForeignMissionDto) {
    return this.employeeForeignMissionService.update(id, updateEmployeeForeignMissionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeeForeignMissionService.remove(id);
  }
}
