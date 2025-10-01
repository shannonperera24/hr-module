import { PartialType } from '@nestjs/mapped-types';
import { CreateArmyRankDto } from './create-army_rank.dto';

export class UpdateArmyRankDto extends PartialType(CreateArmyRankDto) {}
