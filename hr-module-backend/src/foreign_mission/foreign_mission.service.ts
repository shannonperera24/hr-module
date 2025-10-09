import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateForeignMissionDto } from './dto/create-foreign_mission.dto';
import { UpdateForeignMissionDto } from './dto/update-foreign_mission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ForeignMission } from './entities/foreign_mission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ForeignMissionService {
  constructor(
    @InjectRepository(ForeignMission)
    private forMissionRepository: Repository<ForeignMission>
  ) {}
    
  async create(createForeignMissionDto: CreateForeignMissionDto): Promise<ForeignMission> {
    const foreign_mission = this.forMissionRepository.create(createForeignMissionDto);
    return this.forMissionRepository.save(foreign_mission);
  }

  findAll(): Promise<ForeignMission[]> {
    return this.forMissionRepository.find();
  }

  async findOne(foreign_mission_id: number): Promise<ForeignMission> {
    const foreign_mission = await this.forMissionRepository.findOneBy({ foreign_mission_id });
    if (!foreign_mission) {
      throw new NotFoundException(`Foreign mission with ID ${foreign_mission_id} not found`);
    }
    return foreign_mission;
  }

  async update(foreign_mission_id: number, updateForeignMissionDto: UpdateForeignMissionDto): Promise<ForeignMission> {
    const result = await this.forMissionRepository.update(foreign_mission_id, updateForeignMissionDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Foreign mission with ID ${foreign_mission_id} not found`);
    }
    return this.findOne(foreign_mission_id);
  }

  async remove(foreign_mission_id: number): Promise <void> {
    const result = await this.forMissionRepository.delete(foreign_mission_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Foreign mission with ID ${foreign_mission_id} not found`);
    }
  }
}