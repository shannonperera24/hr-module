import { PartialType } from '@nestjs/mapped-types';
import { CreateDisciplinaryActionDto } from './create-disciplinary_action.dto';

export class UpdateDisciplinaryActionDto extends PartialType(CreateDisciplinaryActionDto) {}
