import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComputerSkillDto } from './dto/create-computer_skill.dto';
import { UpdateComputerSkillDto } from './dto/update-computer_skill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ComputerSkill } from './entities/computer_skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComputerSkillService {
  constructor(
    @InjectRepository(ComputerSkill)
    private compSkillRepository: Repository<ComputerSkill>
  ) {}

  async create(createComputerSkillDto: CreateComputerSkillDto): Promise<ComputerSkill> {
    const computer_skill = this.compSkillRepository.create(createComputerSkillDto);
    return this.compSkillRepository.save(computer_skill);
  }

  findAll(): Promise<ComputerSkill[]> {
    return this.compSkillRepository.find();
  }

  async findOne(computer_skill_id: number): Promise<ComputerSkill> {
    const computer_skill = await this.compSkillRepository.findOneBy({ computer_skill_id });
    if (!computer_skill) {
      throw new NotFoundException(`Computer skill with ID ${computer_skill_id} not found`);
    }
    return computer_skill;
  }

  async update(computer_skill_id: number, updateComputerSkillDto: UpdateComputerSkillDto): Promise<ComputerSkill> {
    const result = await this.compSkillRepository.update(computer_skill_id, updateComputerSkillDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Computer skill with ID ${computer_skill_id} not found`);
    }
    return this.findOne(computer_skill_id);
  }

  async remove(computer_skill_id: number): Promise<void> {
    const result = await this.compSkillRepository.delete(computer_skill_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Computer skill with ID ${computer_skill_id} not found`);
    }
  }
}