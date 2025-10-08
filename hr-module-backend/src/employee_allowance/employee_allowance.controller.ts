import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { EmployeeAllowanceService } from './employee_allowance.service';
import { CreateEmployeeAllowanceDto } from './dto/create-employee_allowance.dto';
import { UpdateEmployeeAllowanceDto } from './dto/update-employee_allowance.dto';

@Controller('employee_allowance')
export class EmployeeAllowanceController {
  constructor(private readonly employeeAllowanceService: EmployeeAllowanceService) {}

  @Post()
  create(@Body(ValidationPipe) createEmployeeAllowanceDto: CreateEmployeeAllowanceDto) {
    return this.employeeAllowanceService.create(createEmployeeAllowanceDto);
  }

  @Get()
  findAll() {
    return this.employeeAllowanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeeAllowanceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateEmployeeAllowanceDto: UpdateEmployeeAllowanceDto) {
    return this.employeeAllowanceService.update(id, updateEmployeeAllowanceDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeeAllowanceService.remove(id);
  }
}
