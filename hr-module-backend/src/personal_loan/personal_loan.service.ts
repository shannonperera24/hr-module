import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonalLoanDto } from './dto/create-personal_loan.dto';
import { UpdatePersonalLoanDto } from './dto/update-personal_loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalLoan } from './entities/personal_loan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonalLoanService {
  constructor(
    @InjectRepository(PersonalLoan)
    private personalLoanRepository: Repository<PersonalLoan>
  ) {}
    
  async create(createPersonalLoanDto: CreatePersonalLoanDto): Promise<PersonalLoan> {
    const personal_loan = this.personalLoanRepository.create(createPersonalLoanDto);
    return this.personalLoanRepository.save(personal_loan);
  }

  findAll(): Promise<PersonalLoan[]> {
    return this.personalLoanRepository.find();
  }

  async findOne(loan_id: number): Promise<PersonalLoan> {
    const personal_loan = await this.personalLoanRepository.findOneBy({ loan_id });
    if (!personal_loan) {
      throw new NotFoundException(`Personal loan with ID ${loan_id} not found`);
    }
    return personal_loan;
  }

  async update(loan_id: number, updatePersonalLoanDto: UpdatePersonalLoanDto): Promise<PersonalLoan> {
    const result = await this.personalLoanRepository.update(loan_id, updatePersonalLoanDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Personal loan with ID ${loan_id} not found`);
    }
    return this.findOne(loan_id);
  }

  async remove(loan_id: number): Promise <void> {
    const result = await this.personalLoanRepository.delete(loan_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Personal loan with ID ${loan_id} not found`);
    }
  }
}