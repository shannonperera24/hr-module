import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { PayAndBenefitsService } from './pay_and_benefits.service';
import { CreatePayAndBenefitDto } from './dto/create-pay_and_benefit.dto';
import { UpdatePayAndBenefitDto } from './dto/update-pay_and_benefit.dto';

@Controller('pay_and_benefits')
export class PayAndBenefitsController {
  constructor(private readonly payAndBenefitsService: PayAndBenefitsService) {}

  @Post()
  create(@Body(ValidationPipe) createPayAndBenefitDto: CreatePayAndBenefitDto) {
    return this.payAndBenefitsService.create(createPayAndBenefitDto);
  }

  @Get()
  findAll() {
    return this.payAndBenefitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.payAndBenefitsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updatePayAndBenefitDto: UpdatePayAndBenefitDto) {
    return this.payAndBenefitsService.update(id, updatePayAndBenefitDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.payAndBenefitsService.remove(id);
  }
}
