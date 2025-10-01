import { PartialType } from '@nestjs/mapped-types';
import { CreateCorpAndRegimentDto } from './create-corp_and_regiment.dto';

export class UpdateCorpAndRegimentDto extends PartialType(CreateCorpAndRegimentDto) {}
