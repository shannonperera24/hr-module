import { PartialType } from '@nestjs/mapped-types';
import { CreateCivilQualificationDto } from './create-civil_qualification.dto';

export class UpdateCivilQualificationDto extends PartialType(CreateCivilQualificationDto) {}
