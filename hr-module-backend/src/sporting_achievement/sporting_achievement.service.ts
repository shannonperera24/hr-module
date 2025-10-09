import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSportingAchievementDto } from './dto/create-sporting_achievement.dto';
import { UpdateSportingAchievementDto } from './dto/update-sporting_achievement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SportingAchievement } from './entities/sporting_achievement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SportingAchievementService {
  constructor(
    @InjectRepository(SportingAchievement)
    private sportingAchRepository: Repository<SportingAchievement>
  ) {}
    
  async create(createSportingAchievementDto: CreateSportingAchievementDto): Promise<SportingAchievement> {
    const sporting_achievement = this.sportingAchRepository.create(createSportingAchievementDto);
    return this.sportingAchRepository.save(sporting_achievement);
  }

  findAll(): Promise<SportingAchievement[]> {
    return this.sportingAchRepository.find();
  }

  async findOne(sporting_achievement_id: number): Promise<SportingAchievement> {
    const sporting_achievement = await this.sportingAchRepository.findOneBy({ sporting_achievement_id });
    if (!sporting_achievement) {
      throw new NotFoundException(`Sporting achievement with ID ${sporting_achievement_id} not found`);
    }
    return sporting_achievement;
  }

  async update(sporting_achievement_id: number, updateSportingAchievementDto: UpdateSportingAchievementDto): Promise<SportingAchievement> {
    const result = await this.sportingAchRepository.update(sporting_achievement_id, updateSportingAchievementDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Sporting achievement with ID ${sporting_achievement_id} not found`);
    }
    return this.findOne(sporting_achievement_id);
  }

  async remove(sporting_achievement_id: number): Promise <void> {
    const result = await this.sportingAchRepository.delete(sporting_achievement_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Sporting achievement with ID ${sporting_achievement_id} not found`);
    }
  }
}