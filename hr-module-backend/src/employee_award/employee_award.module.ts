import { Module } from '@nestjs/common';
import { EmployeeAwardService } from './employee_award.service';
import { EmployeeAwardController } from './employee_award.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeAward } from './entities/employee_award.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeAward])],
  controllers: [EmployeeAwardController],
  providers: [EmployeeAwardService],
})
export class EmployeeAwardModule {}
