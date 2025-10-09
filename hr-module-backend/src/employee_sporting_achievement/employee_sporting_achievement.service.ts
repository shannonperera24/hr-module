import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeSportingAchievementDto } from './dto/create-employee_sporting_achievement.dto';
import { UpdateEmployeeSportingAchievementDto } from './dto/update-employee_sporting_achievement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeSportingAchievement } from './entities/employee_sporting_achievement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeSportingAchievementService {
  constructor(
    @InjectRepository(EmployeeSportingAchievement)
    private empSportAchRepository: Repository<EmployeeSportingAchievement>
  ) {}

  async create(createEmployeeSportingAchievementDto: CreateEmployeeSportingAchievementDto): Promise<EmployeeSportingAchievement> {
    const employee_sporting_achievement = this.empSportAchRepository.create(createEmployeeSportingAchievementDto);
    return this.empSportAchRepository.save(employee_sporting_achievement);
  }
  
  findAll(): Promise<EmployeeSportingAchievement[]> {
    return this.empSportAchRepository.find();
  }

  async findOne(employee_sporting_achievement_id: number): Promise<EmployeeSportingAchievement> {
    const employee_sporting_achievement = await this.empSportAchRepository.findOneBy({ employee_sporting_achievement_id });
    if (!employee_sporting_achievement) {
      throw new NotFoundException(`Employee sporting achievement with ID ${employee_sporting_achievement_id} not found`);
    }
    return employee_sporting_achievement;
  }

  async update(employee_sporting_achievement_id: number, updateEmployeeSportingAchievementDto: UpdateEmployeeSportingAchievementDto): Promise<EmployeeSportingAchievement> {
    const result = await this.empSportAchRepository.update(employee_sporting_achievement_id, updateEmployeeSportingAchievementDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee sporting achievement with ID ${employee_sporting_achievement_id} not found`);
    }
    return this.findOne(employee_sporting_achievement_id);
  }

  async remove(employee_sporting_achievement_id: number): Promise <void> {
    const result = await this.empSportAchRepository.delete(employee_sporting_achievement_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee sporting achievement with ID ${employee_sporting_achievement_id} not found`);
    }
  }
}