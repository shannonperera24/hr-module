import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeClearanceDto } from './create-employee_clearance.dto';

export class UpdateEmployeeClearanceDto extends PartialType(CreateEmployeeClearanceDto) {}
