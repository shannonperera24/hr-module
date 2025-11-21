import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeClearanceDto } from './dto/create-employee_clearance.dto';
import { UpdateEmployeeClearanceDto } from './dto/update-employee_clearance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeClearance } from './entities/employee_clearance.entity';
import { Between, Repository } from 'typeorm';

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

  //dashboard
  async getExpiringSoon(): Promise<{ expiringSoon: number }> {
    const today = new Date();
    const next30 = new Date();
    next30.setDate(today.getDate() + 30);
    today.setHours(0, 0, 0, 0);
    next30.setHours(23, 59, 59, 999);
    const count = await this.empClearanceRepository.count({
      where: {
        clearance_expiry: Between(today, next30)
      }
    });
    return { expiringSoon: count };
  }
}
  