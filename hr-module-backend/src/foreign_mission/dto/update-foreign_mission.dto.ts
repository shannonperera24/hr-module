import { PartialType } from '@nestjs/mapped-types';
import { CreateForeignMissionDto } from './create-foreign_mission.dto';

export class UpdateForeignMissionDto extends PartialType(CreateForeignMissionDto) {}
