import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ServiceHistoryService } from './service_history.service';
import { CreateServiceHistoryDto } from './dto/create-service_history.dto';
import { UpdateServiceHistoryDto } from './dto/update-service_history.dto';

@Controller('service_history')
export class ServiceHistoryController {
  constructor(private readonly serviceHistoryService: ServiceHistoryService) {}

  @Post()
  create(@Body(ValidationPipe) createServiceHistoryDto: CreateServiceHistoryDto) {
    return this.serviceHistoryService.create(createServiceHistoryDto);
  }

  @Get()
  findAll() {
    return this.serviceHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.serviceHistoryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateServiceHistoryDto: UpdateServiceHistoryDto) {
    return this.serviceHistoryService.update(id, updateServiceHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.serviceHistoryService.remove(id);
  }
}
