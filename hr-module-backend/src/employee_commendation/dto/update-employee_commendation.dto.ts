import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeCommendationDto } from './create-employee_commendation.dto';

export class UpdateEmployeeCommendationDto extends PartialType(CreateEmployeeCommendationDto) {}
