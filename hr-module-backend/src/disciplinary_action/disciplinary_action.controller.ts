import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { DisciplinaryActionService } from './disciplinary_action.service';
import { CreateDisciplinaryActionDto } from './dto/create-disciplinary_action.dto';
import { UpdateDisciplinaryActionDto } from './dto/update-disciplinary_action.dto';

@Controller('disciplinary_action')
export class DisciplinaryActionController {
  constructor(private readonly disciplinaryActionService: DisciplinaryActionService) {}

  @Post()
  create(@Body(ValidationPipe) createDisciplinaryActionDto: CreateDisciplinaryActionDto) {
    return this.disciplinaryActionService.create(createDisciplinaryActionDto);
  }

  @Get()
  findAll() {
    return this.disciplinaryActionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.disciplinaryActionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateDisciplinaryActionDto: UpdateDisciplinaryActionDto) {
    return this.disciplinaryActionService.update(id, updateDisciplinaryActionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.disciplinaryActionService.remove(id);
  }
}
