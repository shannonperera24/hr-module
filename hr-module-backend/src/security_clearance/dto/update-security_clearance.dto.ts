import { PartialType } from '@nestjs/mapped-types';
import { CreateSecurityClearanceDto } from './create-security_clearance.dto';

export class UpdateSecurityClearanceDto extends PartialType(CreateSecurityClearanceDto) {}
