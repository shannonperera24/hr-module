import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { EmployeeAwardService } from './employee_award.service';
import { CreateEmployeeAwardDto } from './dto/create-employee_award.dto';
import { UpdateEmployeeAwardDto } from './dto/update-employee_award.dto';

@Controller('employee_award')
export class EmployeeAwardController {
  constructor(private readonly employeeAwardService: EmployeeAwardService) {}

  @Post()
  create(@Body(ValidationPipe) createEmployeeAwardDto: CreateEmployeeAwardDto) {
    return this.employeeAwardService.create(createEmployeeAwardDto);
  }

  @Get()
  findAll() {
    return this.employeeAwardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeeAwardService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateEmployeeAwardDto: UpdateEmployeeAwardDto) {
    return this.employeeAwardService.update(id, updateEmployeeAwardDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeeAwardService.remove(id);
  }
}
