import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeForeignMissionDto } from './dto/create-employee_foreign_mission.dto';
import { UpdateEmployeeForeignMissionDto } from './dto/update-employee_foreign_mission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeForeignMission } from './entities/employee_foreign_mission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeForeignMissionService {
  constructor(
    @InjectRepository(EmployeeForeignMission)
    private empForeignMisRepository: Repository<EmployeeForeignMission>
  ) {}

  async create(createEmployeeForeignMissionDto: CreateEmployeeForeignMissionDto): Promise<EmployeeForeignMission> {
    const employee_foreign_mission = this.empForeignMisRepository.create(createEmployeeForeignMissionDto);
    return this.empForeignMisRepository.save(employee_foreign_mission);
  }
  
  findAll(): Promise<EmployeeForeignMission[]> {
    return this.empForeignMisRepository.find();
  }

  async findOne(employee_foreign_mission_id: number): Promise<EmployeeForeignMission> {
    const employee_foreign_mission = await this.empForeignMisRepository.findOneBy({ employee_foreign_mission_id });
    if (!employee_foreign_mission) {
      throw new NotFoundException(`Employee foreign mission with ID ${employee_foreign_mission_id} not found`);
    }
    return employee_foreign_mission;
  }

  async update(employee_foreign_mission_id: number, updateEmployeeForeignMissionDto: UpdateEmployeeForeignMissionDto): Promise<EmployeeForeignMission> {
    const result = await this.empForeignMisRepository.update(employee_foreign_mission_id, updateEmployeeForeignMissionDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee foreign mission with ID ${employee_foreign_mission_id} not found`);
    }
    return this.findOne(employee_foreign_mission_id);
  }

  async remove(employee_foreign_mission_id: number): Promise <void> {
    const result = await this.empForeignMisRepository.delete(employee_foreign_mission_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee foreign mission with ID ${employee_foreign_mission_id} not found`);
    }
  }
}
    