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
    return this.employeeRepository.find();
  }

  async findOne(emp_no: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOneBy({ emp_no });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${emp_no} not found`);
    }
    return employee;
  }

  async update(emp_no: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const result = await this.employeeRepository.update(emp_no, updateEmployeeDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${emp_no} not found`);
    }
    return this.findOne(emp_no);
  }

  async remove(emp_no: number): Promise <void> {
    const result = await this.employeeRepository.delete(emp_no);
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${emp_no} not found`);
    }
  }
}
