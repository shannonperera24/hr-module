import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { QualificationComputerSkillService } from './qualification_computer_skill.service';
import { CreateQualificationComputerSkillDto } from './dto/create-qualification_computer_skill.dto';
import { UpdateQualificationComputerSkillDto } from './dto/update-qualification_computer_skill.dto';

@Controller('qualification_computer_skill')
export class QualificationComputerSkillController {
  constructor(private readonly qualificationComputerSkillService: QualificationComputerSkillService) {}

  @Post()
  create(@Body(ValidationPipe) createQualificationComputerSkillDto: CreateQualificationComputerSkillDto) {
    return this.qualificationComputerSkillService.create(createQualificationComputerSkillDto);
  }

  @Get()
  findAll() {
    return this.qualificationComputerSkillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.qualificationComputerSkillService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateQualificationComputerSkillDto: UpdateQualificationComputerSkillDto) {
    return this.qualificationComputerSkillService.update(id, updateQualificationComputerSkillDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.qualificationComputerSkillService.remove(id);
  }
}
