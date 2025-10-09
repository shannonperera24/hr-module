import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeAwardDto } from './dto/create-employee_award.dto';
import { UpdateEmployeeAwardDto } from './dto/update-employee_award.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeAward } from './entities/employee_award.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeAwardService {
  constructor(
    @InjectRepository(EmployeeAward)
    private empAwardRepository: Repository<EmployeeAward>
  ) {}

  async create(createEmployeeAwardDto: CreateEmployeeAwardDto): Promise<EmployeeAward> {
    const employee_award = this.empAwardRepository.create(createEmployeeAwardDto);
    return this.empAwardRepository.save(employee_award);
  }
  
  findAll(): Promise<EmployeeAward[]> {
    return this.empAwardRepository.find();
  }

  async findOne(employee_award_id: number): Promise<EmployeeAward> {
    const employee_award = await this.empAwardRepository.findOneBy({ employee_award_id });
    if (!employee_award) {
      throw new NotFoundException(`Employee award with ID ${employee_award_id} not found`);
    }
    return employee_award;
  }

  async update(employee_award_id: number, updateEmployeeAwardDto: UpdateEmployeeAwardDto): Promise<EmployeeAward> {
    const result = await this.empAwardRepository.update(employee_award_id, updateEmployeeAwardDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee award with ID ${employee_award_id} not found`);
    }
    return this.findOne(employee_award_id);
  }

  async remove(employee_award_id: number): Promise <void> {
    const result = await this.empAwardRepository.delete(employee_award_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee award with ID ${employee_award_id} not found`);
    }
  }
}
  