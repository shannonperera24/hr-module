import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeAllowanceDto } from './dto/create-employee_allowance.dto';
import { UpdateEmployeeAllowanceDto } from './dto/update-employee_allowance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeAllowance } from './entities/employee_allowance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeAllowanceService {
  constructor(
    @InjectRepository(EmployeeAllowance)
    private empAllowanceRepository: Repository<EmployeeAllowance>
  ) {}

  async create(createEmployeeAllowanceDto: CreateEmployeeAllowanceDto): Promise<EmployeeAllowance> {
    const employee_allowance = this.empAllowanceRepository.create(createEmployeeAllowanceDto);
    return this.empAllowanceRepository.save(employee_allowance);
  }
  
  findAll(): Promise<EmployeeAllowance[]> {
    return this.empAllowanceRepository.find();
  }

  async findOne(employee_allowance_id: number): Promise<EmployeeAllowance> {
    const employee_allowance = await this.empAllowanceRepository.findOneBy({ employee_allowance_id });
    if (!employee_allowance) {
      throw new NotFoundException(`Employee allowance with ID ${employee_allowance_id} not found`);
    }
    return employee_allowance;
  }

  async update(employee_allowance_id: number, updateEmployeeAllowanceDto: UpdateEmployeeAllowanceDto): Promise<EmployeeAllowance> {
    const result = await this.empAllowanceRepository.update(employee_allowance_id, updateEmployeeAllowanceDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee allowance with ID ${employee_allowance_id} not found`);
    }
    return this.findOne(employee_allowance_id);
  }

  async remove(employee_allowance_id: number): Promise <void> {
    const result = await this.empAllowanceRepository.delete(employee_allowance_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee allowance with ID ${employee_allowance_id} not found`);
    }
  }
}