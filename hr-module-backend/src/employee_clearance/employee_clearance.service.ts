import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeClearanceDto } from './dto/create-employee_clearance.dto';
import { UpdateEmployeeClearanceDto } from './dto/update-employee_clearance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeClearance } from './entities/employee_clearance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeClearanceService {
  constructor(
    @InjectRepository(EmployeeClearance)
    private empClearanceRepository: Repository<EmployeeClearance>
  ) {}

  async create(createEmployeeClearanceDto: CreateEmployeeClearanceDto): Promise<EmployeeClearance> {
    const employee_clearance = this.empClearanceRepository.create(createEmployeeClearanceDto);
    return this.empClearanceRepository.save(employee_clearance);
  }
  
  findAll(): Promise<EmployeeClearance[]> {
    return this.empClearanceRepository.find();
  }

  async findOne(employee_clearance_id: number): Promise<EmployeeClearance> {
    const employee_clearance = await this.empClearanceRepository.findOneBy({ employee_clearance_id });
    if (!employee_clearance) {
      throw new NotFoundException(`Employee clearance with ID ${employee_clearance_id} not found`);
    }
    return employee_clearance;
  }

  async update(employee_clearance_id: number, updateEmployeeClearanceDto: UpdateEmployeeClearanceDto): Promise<EmployeeClearance> {
    const result = await this.empClearanceRepository.update(employee_clearance_id, updateEmployeeClearanceDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee clearance with ID ${employee_clearance_id} not found`);
    }
    return this.findOne(employee_clearance_id);
  }

  async remove(employee_clearance_id: number): Promise <void> {
    const result = await this.empClearanceRepository.delete(employee_clearance_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee clearance with ID ${employee_clearance_id} not found`);
    }
  }
}
  