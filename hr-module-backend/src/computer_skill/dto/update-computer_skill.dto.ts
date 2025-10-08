import { PartialType } from '@nestjs/mapped-types';
import { CreateComputerSkillDto } from './create-computer_skill.dto';

export class UpdateComputerSkillDto extends PartialType(CreateComputerSkillDto) {}
