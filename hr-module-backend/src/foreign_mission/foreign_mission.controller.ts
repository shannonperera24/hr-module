import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ForeignMissionService } from './foreign_mission.service';
import { CreateForeignMissionDto } from './dto/create-foreign_mission.dto';
import { UpdateForeignMissionDto } from './dto/update-foreign_mission.dto';

@Controller('foreign_mission')
export class ForeignMissionController {
  constructor(private readonly foreignMissionService: ForeignMissionService) {}

  @Post()
  create(@Body(ValidationPipe) createForeignMissionDto: CreateForeignMissionDto) {
    return this.foreignMissionService.create(createForeignMissionDto);
  }

  @Get()
  findAll() {
    return this.foreignMissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.foreignMissionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateForeignMissionDto: UpdateForeignMissionDto) {
    return this.foreignMissionService.update(id, updateForeignMissionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.foreignMissionService.remove(id);
  }
}
