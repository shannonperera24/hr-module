import { PartialType } from '@nestjs/mapped-types';
import { CreateQualificationComputerSkillDto } from './create-qualification_computer_skill.dto';

export class UpdateQualificationComputerSkillDto extends PartialType(CreateQualificationComputerSkillDto) {}
