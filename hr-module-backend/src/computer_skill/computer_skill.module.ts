import { Module } from '@nestjs/common';
import { ComputerSkillService } from './computer_skill.service';
import { ComputerSkillController } from './computer_skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComputerSkill } from './entities/computer_skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ComputerSkill])],
  controllers: [ComputerSkillController],
  providers: [ComputerSkillService],
})
export class ComputerSkillModule {}
