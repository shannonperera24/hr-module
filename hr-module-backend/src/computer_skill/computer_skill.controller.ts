import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ComputerSkillService } from './computer_skill.service';
import { CreateComputerSkillDto } from './dto/create-computer_skill.dto';
import { UpdateComputerSkillDto } from './dto/update-computer_skill.dto';

@Controller('computer_skill')
export class ComputerSkillController {
  constructor(private readonly computerSkillService: ComputerSkillService) {}

  @Post()
  create(@Body(ValidationPipe) createComputerSkillDto: CreateComputerSkillDto) {
    return this.computerSkillService.create(createComputerSkillDto);
  }

  @Get()
  findAll() {
    return this.computerSkillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.computerSkillService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateComputerSkillDto: UpdateComputerSkillDto) {
    return this.computerSkillService.update(id, updateComputerSkillDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.computerSkillService.remove(id);
  }
}
