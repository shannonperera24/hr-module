import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create(createEmployeeDto);
    return this.employeeRepository.save(employee);
  }

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({
      where: { is_deleted: false }
    });
  }

  async findOne(emp_no: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ 
      where: { emp_no, is_deleted: false },
      relations: [
        'service_history',
        'postings',
        'pay_and_benefits',
        'qualification_record',
        'medical_and_health_record',
        'employee_clearances'
      ]
    });
    
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${emp_no} not found`);
    }
    return employee;
  }

  async update(emp_no: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const result = await this.employeeRepository.update(
      { emp_no, is_deleted: false }, updateEmployeeDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${emp_no} not found`);
    }
    return this.findOne(emp_no);
  }

  async softDelete(emp_no: number): Promise <void> {
    const result = await this.employeeRepository.update(
      { emp_no, is_deleted: false }, { is_deleted: true });
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${emp_no} not found`);
    }
  }

  //dashboard
  async getTotalPersonnel(): Promise<number> {
    return await this.employeeRepository.count({
      where: { is_deleted: false }
    });
  }
}