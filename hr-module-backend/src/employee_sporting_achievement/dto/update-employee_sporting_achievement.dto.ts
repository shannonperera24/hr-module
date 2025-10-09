import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeSportingAchievementDto } from './create-employee_sporting_achievement.dto';

export class UpdateEmployeeSportingAchievementDto extends PartialType(CreateEmployeeSportingAchievementDto) {}
