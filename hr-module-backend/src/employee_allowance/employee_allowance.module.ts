import { Module } from '@nestjs/common';
import { EmployeeAllowanceService } from './employee_allowance.service';
import { EmployeeAllowanceController } from './employee_allowance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeAllowance } from './entities/employee_allowance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeAllowance])],
  controllers: [EmployeeAllowanceController],
  providers: [EmployeeAllowanceService],
})
export class EmployeeAllowanceModule {}
