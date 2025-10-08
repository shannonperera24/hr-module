import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { PersonalLoanService } from './personal_loan.service';
import { CreatePersonalLoanDto } from './dto/create-personal_loan.dto';
import { UpdatePersonalLoanDto } from './dto/update-personal_loan.dto';

@Controller('personal_loan')
export class PersonalLoanController {
  constructor(private readonly personalLoanService: PersonalLoanService) {}

  @Post()
  create(@Body(ValidationPipe) createPersonalLoanDto: CreatePersonalLoanDto) {
    return this.personalLoanService.create(createPersonalLoanDto);
  }

  @Get()
  findAll() {
    return this.personalLoanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.personalLoanService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updatePersonalLoanDto: UpdatePersonalLoanDto) {
    return this.personalLoanService.update(id, updatePersonalLoanDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.personalLoanService.remove(id);
  }
}
