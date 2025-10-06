import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { OverseasPostingService } from './overseas_posting.service';
import { CreateOverseasPostingDto } from './dto/create-overseas_posting.dto';
import { UpdateOverseasPostingDto } from './dto/update-overseas_posting.dto';

@Controller('overseas_posting')
export class OverseasPostingController {
  constructor(private readonly overseasPostingService: OverseasPostingService) {}

  @Post()
  create(@Body(ValidationPipe) createOverseasPostingDto: CreateOverseasPostingDto) {
    return this.overseasPostingService.create(createOverseasPostingDto);
  }

  @Get()
  findAll() {
    return this.overseasPostingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.overseasPostingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateOverseasPostingDto: UpdateOverseasPostingDto) {
    return this.overseasPostingService.update(id, updateOverseasPostingDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.overseasPostingService.remove(id);
  }
}
