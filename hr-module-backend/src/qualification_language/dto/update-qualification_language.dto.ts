import { PartialType } from '@nestjs/mapped-types';
import { CreateQualificationLanguageDto } from './create-qualification_language.dto';

export class UpdateQualificationLanguageDto extends PartialType(CreateQualificationLanguageDto) {}
