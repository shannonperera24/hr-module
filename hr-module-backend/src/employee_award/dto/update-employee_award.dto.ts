import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeAwardDto } from './create-employee_award.dto';

export class UpdateEmployeeAwardDto extends PartialType(CreateEmployeeAwardDto) {}
