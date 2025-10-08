import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { AllowanceService } from './allowance.service';
import { CreateAllowanceDto } from './dto/create-allowance.dto';
import { UpdateAllowanceDto } from './dto/update-allowance.dto';

@Controller('allowance')
export class AllowanceController {
  constructor(private readonly allowanceService: AllowanceService) {}

  @Post()
  create(@Body(ValidationPipe) createAllowanceDto: CreateAllowanceDto) {
    return this.allowanceService.create(createAllowanceDto);
  }

  @Get()
  findAll() {
    return this.allowanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.allowanceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateAllowanceDto: UpdateAllowanceDto) {
    return this.allowanceService.update(id, updateAllowanceDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.allowanceService.remove(id);
  }
}
