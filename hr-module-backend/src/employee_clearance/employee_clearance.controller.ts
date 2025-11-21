import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { EmployeeClearanceService } from './employee_clearance.service';
import { CreateEmployeeClearanceDto } from './dto/create-employee_clearance.dto';
import { UpdateEmployeeClearanceDto } from './dto/update-employee_clearance.dto';

@Controller('employee_clearance')
export class EmployeeClearanceController {
  constructor(private readonly employeeClearanceService: EmployeeClearanceService) {}

  @Post()
  create(@Body(ValidationPipe) createEmployeeClearanceDto: CreateEmployeeClearanceDto) {
    return this.employeeClearanceService.create(createEmployeeClearanceDto);
  }

  @Get()
  findAll() {
    return this.employeeClearanceService.findAll();
  }

  //dashboard
  @Get('stats/expiring')
  async getExpiringSoon() {
    return this.employeeClearanceService.getExpiringSoon();
  }
  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeeClearanceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateEmployeeClearanceDto: UpdateEmployeeClearanceDto) {
    return this.employeeClearanceService.update(id, updateEmployeeClearanceDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeeClearanceService.remove(id);
  }
}
