import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { SecurityClearanceService } from './security_clearance.service';
import { CreateSecurityClearanceDto } from './dto/create-security_clearance.dto';
import { UpdateSecurityClearanceDto } from './dto/update-security_clearance.dto';

@Controller('security_clearance')
export class SecurityClearanceController {
  constructor(private readonly securityClearanceService: SecurityClearanceService) {}

  @Post()
  create(@Body(ValidationPipe) createSecurityClearanceDto: CreateSecurityClearanceDto) {
    return this.securityClearanceService.create(createSecurityClearanceDto);
  }

  @Get()
  findAll() {
    return this.securityClearanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.securityClearanceService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateSecurityClearanceDto: UpdateSecurityClearanceDto) {
    return this.securityClearanceService.update(id, updateSecurityClearanceDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.securityClearanceService.remove(id);
  }
}
