import { Module } from '@nestjs/common';
import { EmployeeClearanceService } from './employee_clearance.service';
import { EmployeeClearanceController } from './employee_clearance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeClearance } from './entities/employee_clearance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeClearance])],
  controllers: [EmployeeClearanceController],
  providers: [EmployeeClearanceService],
})
export class EmployeeClearanceModule {}
