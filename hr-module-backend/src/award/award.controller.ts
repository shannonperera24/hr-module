import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { AwardService } from './award.service';
import { CreateAwardDto } from './dto/create-award.dto';
import { UpdateAwardDto } from './dto/update-award.dto';

@Controller('award')
export class AwardController {
  constructor(private readonly awardService: AwardService) {}

  @Post()
  create(@Body(ValidationPipe) createAwardDto: CreateAwardDto) {
    return this.awardService.create(createAwardDto);
  }

  @Get()
  findAll() {
    return this.awardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.awardService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateAwardDto: UpdateAwardDto) {
    return this.awardService.update(id, updateAwardDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.awardService.remove(id);
  }
}
