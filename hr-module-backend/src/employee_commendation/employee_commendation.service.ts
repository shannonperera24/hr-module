import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeCommendationDto } from './dto/create-employee_commendation.dto';
import { UpdateEmployeeCommendationDto } from './dto/update-employee_commendation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeCommendation } from './entities/employee_commendation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeCommendationService {
  constructor(
    @InjectRepository(EmployeeCommendation)
    private empCommendationRepository: Repository<EmployeeCommendation>
  ) {}

  async create(createEmployeeCommendationDto: CreateEmployeeCommendationDto): Promise<EmployeeCommendation> {
    const employee_commendation = this.empCommendationRepository.create(createEmployeeCommendationDto);
    return this.empCommendationRepository.save(employee_commendation);
  }
  
  findAll(): Promise<EmployeeCommendation[]> {
    return this.empCommendationRepository.find();
  }

  async findOne(employee_commendation_id: number): Promise<EmployeeCommendation> {
    const employee_commendation = await this.empCommendationRepository.findOneBy({ employee_commendation_id });
    if (!employee_commendation) {
      throw new NotFoundException(`Employee commendation with ID ${employee_commendation_id} not found`);
    }
    return employee_commendation;
  }

  async update(employee_commendation_id: number, updateEmployeeCommendationDto: UpdateEmployeeCommendationDto): Promise<EmployeeCommendation> {
    const result = await this.empCommendationRepository.update(employee_commendation_id, updateEmployeeCommendationDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee commendation with ID ${employee_commendation_id} not found`);
    }
    return this.findOne(employee_commendation_id);
  }

  async remove(employee_commendation_id: number): Promise <void> {
    const result = await this.empCommendationRepository.delete(employee_commendation_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee commendation with ID ${employee_commendation_id} not found`);
    }
  }
}
      