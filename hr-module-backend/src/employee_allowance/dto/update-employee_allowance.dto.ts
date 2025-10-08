import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeAllowanceDto } from './create-employee_allowance.dto';

export class UpdateEmployeeAllowanceDto extends PartialType(CreateEmployeeAllowanceDto) {}
