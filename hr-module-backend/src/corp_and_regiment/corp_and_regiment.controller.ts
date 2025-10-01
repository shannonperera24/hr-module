import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { CorpAndRegimentService } from './corp_and_regiment.service';
import { CreateCorpAndRegimentDto } from './dto/create-corp_and_regiment.dto';
import { UpdateCorpAndRegimentDto } from './dto/update-corp_and_regiment.dto';

@Controller('corp_and_regiment')
export class CorpAndRegimentController {
  constructor(private readonly corpAndRegimentService: CorpAndRegimentService) {}

  @Post()
  create(@Body(ValidationPipe) createCorpAndRegimentDto: CreateCorpAndRegimentDto) {
    return this.corpAndRegimentService.create(createCorpAndRegimentDto);
  }

  @Get()
  findAll() {
    return this.corpAndRegimentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.corpAndRegimentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateCorpAndRegimentDto: UpdateCorpAndRegimentDto) {
    return this.corpAndRegimentService.update(id, updateCorpAndRegimentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.corpAndRegimentService.remove(id);
  }
}
