import { Module } from '@nestjs/common';
import { EmployeeSportingAchievementService } from './employee_sporting_achievement.service';
import { EmployeeSportingAchievementController } from './employee_sporting_achievement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeSportingAchievement } from './entities/employee_sporting_achievement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeSportingAchievement])],
  controllers: [EmployeeSportingAchievementController],
  providers: [EmployeeSportingAchievementService],
})
export class EmployeeSportingAchievementModule {}
