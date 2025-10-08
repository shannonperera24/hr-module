import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQualificationComputerSkillDto } from './dto/create-qualification_computer_skill.dto';
import { UpdateQualificationComputerSkillDto } from './dto/update-qualification_computer_skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QualificationComputerSkill } from './entities/qualification_computer_skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QualificationComputerSkillService {
  constructor(
    @InjectRepository(QualificationComputerSkill)
    private qualCompSkillRepository: Repository<QualificationComputerSkill>
  ) {}
    
  async create(createQualificationComputerSkillDto: CreateQualificationComputerSkillDto): Promise<QualificationComputerSkill> {
    const qualification_computer_skill = this.qualCompSkillRepository.create(createQualificationComputerSkillDto);
    return this.qualCompSkillRepository.save(qualification_computer_skill);
  }

  findAll(): Promise<QualificationComputerSkill[]> {
    return this.qualCompSkillRepository.find();
  }

  async findOne(qualification_computer_skill_id: number): Promise<QualificationComputerSkill> {
    const qualification_computer_skill = await this.qualCompSkillRepository.findOneBy({ qualification_computer_skill_id });
    if (!qualification_computer_skill) {
      throw new NotFoundException(`Qualification computer skill with ID ${qualification_computer_skill_id} not found`);
    }
    return qualification_computer_skill;
  }

  async update(qualification_computer_skill_id: number, updateQualificationComputerSkillDto: UpdateQualificationComputerSkillDto): Promise<QualificationComputerSkill> {
    const result = await this.qualCompSkillRepository.update(qualification_computer_skill_id, updateQualificationComputerSkillDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Qualification computer skill with ID ${qualification_computer_skill_id} not found`);
    }
    return this.findOne(qualification_computer_skill_id);
  }

  async remove(qualification_computer_skill_id: number): Promise <void> {
    const result = await this.qualCompSkillRepository.delete(qualification_computer_skill_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Qualification computer skill with ID ${qualification_computer_skill_id} not found`);
    }
  }
}