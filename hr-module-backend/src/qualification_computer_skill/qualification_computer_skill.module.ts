import { Module } from '@nestjs/common';
import { QualificationComputerSkillService } from './qualification_computer_skill.service';
import { QualificationComputerSkillController } from './qualification_computer_skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualificationComputerSkill } from './entities/qualification_computer_skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QualificationComputerSkill])],
  controllers: [QualificationComputerSkillController],
  providers: [QualificationComputerSkillService],
})
export class QualificationComputerSkillModule {}
