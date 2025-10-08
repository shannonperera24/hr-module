import { PartialType } from '@nestjs/mapped-types';
import { CreateLanguageProficiencyDto } from './create-language_proficiency.dto';

export class UpdateLanguageProficiencyDto extends PartialType(CreateLanguageProficiencyDto) {}
