import { Module } from '@nestjs/common';
import { EmployeeCommendationService } from './employee_commendation.service';
import { EmployeeCommendationController } from './employee_commendation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeCommendation } from './entities/employee_commendation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeCommendation])],
  controllers: [EmployeeCommendationController],
  providers: [EmployeeCommendationService],
})
export class EmployeeCommendationModule {}
