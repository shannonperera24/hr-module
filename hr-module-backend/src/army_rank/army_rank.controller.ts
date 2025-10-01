import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ArmyRankService } from './army_rank.service';
import { CreateArmyRankDto } from './dto/create-army_rank.dto';
import { UpdateArmyRankDto } from './dto/update-army_rank.dto';

@Controller('army_rank')
export class ArmyRankController {
  constructor(private readonly armyRankService: ArmyRankService) {}

  @Post()
  create(@Body(ValidationPipe) createArmyRankDto: CreateArmyRankDto) {
    return this.armyRankService.create(createArmyRankDto);
  }

  @Get()
  findAll() {
    return this.armyRankService.findAll();
  }
 
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.armyRankService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateArmyRankDto: UpdateArmyRankDto) {
    return this.armyRankService.update(id, updateArmyRankDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.armyRankService.remove(id);
  }
}
