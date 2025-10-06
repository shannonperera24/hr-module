import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CourtMartialRecordService } from './court_martial_record.service';
import { CreateCourtMartialRecordDto } from './dto/create-court_martial_record.dto';
import { UpdateCourtMartialRecordDto } from './dto/update-court_martial_record.dto';

@Controller('court_martial_record')
export class CourtMartialRecordController {
  constructor(private readonly courtMartialRecordService: CourtMartialRecordService) {}

  @Post()
  create(@Body(ValidationPipe) createCourtMartialRecordDto: CreateCourtMartialRecordDto) {
    return this.courtMartialRecordService.create(createCourtMartialRecordDto);
  }

  @Get()
  findAll() {
    return this.courtMartialRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.courtMartialRecordService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateCourtMartialRecordDto: UpdateCourtMartialRecordDto) {
    return this.courtMartialRecordService.update(id, updateCourtMartialRecordDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.courtMartialRecordService.remove(id);
  }
}
