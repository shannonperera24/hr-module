import { PartialType } from '@nestjs/mapped-types';
import { CreateOverseasPostingDto } from './create-overseas_posting.dto';

export class UpdateOverseasPostingDto extends PartialType(CreateOverseasPostingDto) {}
