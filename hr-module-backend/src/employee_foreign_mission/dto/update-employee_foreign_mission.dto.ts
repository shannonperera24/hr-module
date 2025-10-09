import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeForeignMissionDto } from './create-employee_foreign_mission.dto';

export class UpdateEmployeeForeignMissionDto extends PartialType(CreateEmployeeForeignMissionDto) {}
