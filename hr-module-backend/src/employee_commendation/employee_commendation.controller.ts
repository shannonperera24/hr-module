import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { EmployeeCommendationService } from './employee_commendation.service';
import { CreateEmployeeCommendationDto } from './dto/create-employee_commendation.dto';
import { UpdateEmployeeCommendationDto } from './dto/update-employee_commendation.dto';

@Controller('employee_commendation')
export class EmployeeCommendationController {
  constructor(private readonly employeeCommendationService: EmployeeCommendationService) {}

  @Post()
  create(@Body(ValidationPipe) createEmployeeCommendationDto: CreateEmployeeCommendationDto) {
    return this.employeeCommendationService.create(createEmployeeCommendationDto);
  }

  @Get()
  findAll() {
    return this.employeeCommendationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeeCommendationService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateEmployeeCommendationDto: UpdateEmployeeCommendationDto) {
    return this.employeeCommendationService.update(id, updateEmployeeCommendationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeeCommendationService.remove(id);
  }
}
