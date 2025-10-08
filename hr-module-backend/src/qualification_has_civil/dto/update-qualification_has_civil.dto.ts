import { PartialType } from '@nestjs/mapped-types';
import { CreateQualificationHasCivilDto } from './create-qualification_has_civil.dto';

export class UpdateQualificationHasCivilDto extends PartialType(CreateQualificationHasCivilDto) {}
