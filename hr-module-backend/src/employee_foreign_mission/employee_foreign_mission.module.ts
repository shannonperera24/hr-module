import { Module } from '@nestjs/common';
import { EmployeeForeignMissionService } from './employee_foreign_mission.service';
import { EmployeeForeignMissionController } from './employee_foreign_mission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeForeignMission } from './entities/employee_foreign_mission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeForeignMission])],
  controllers: [EmployeeForeignMissionController],
  providers: [EmployeeForeignMissionService],
})
export class EmployeeForeignMissionModule {}
