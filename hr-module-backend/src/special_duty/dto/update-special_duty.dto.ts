import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecialDutyDto } from './create-special_duty.dto';

export class UpdateSpecialDutyDto extends PartialType(CreateSpecialDutyDto) {}
