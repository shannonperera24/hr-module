import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { SpecialDutyService } from './special_duty.service';
import { CreateSpecialDutyDto } from './dto/create-special_duty.dto';
import { UpdateSpecialDutyDto } from './dto/update-special_duty.dto';

@Controller('special_duty')
export class SpecialDutyController {
  constructor(private readonly specialDutyService: SpecialDutyService) {}

  @Post()
  create(@Body(ValidationPipe) createSpecialDutyDto: CreateSpecialDutyDto) {
    return this.specialDutyService.create(createSpecialDutyDto);
  }

  @Get()
  findAll() {
    return this.specialDutyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.specialDutyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateSpecialDutyDto: UpdateSpecialDutyDto) {
    return this.specialDutyService.update(id, updateSpecialDutyDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.specialDutyService.remove(id);
  }
}
