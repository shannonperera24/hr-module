import { PartialType } from '@nestjs/mapped-types';
import { CreateSportingAchievementDto } from './create-sporting_achievement.dto';

export class UpdateSportingAchievementDto extends PartialType(CreateSportingAchievementDto) {}
