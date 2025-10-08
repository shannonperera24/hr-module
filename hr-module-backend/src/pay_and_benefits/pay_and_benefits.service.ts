import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePayAndBenefitDto } from './dto/create-pay_and_benefit.dto';
import { UpdatePayAndBenefitDto } from './dto/update-pay_and_benefit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PayAndBenefit } from './entities/pay_and_benefit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PayAndBenefitsService {
  constructor(
    @InjectRepository(PayAndBenefit)
    private payAndBenefitRepository: Repository<PayAndBenefit>
  ) {}

  async create(createPayAndBenefitDto: CreatePayAndBenefitDto): Promise<PayAndBenefit> {
    const pay_and_benefits = this.payAndBenefitRepository.create(createPayAndBenefitDto);
    return this.payAndBenefitRepository.save(pay_and_benefits);
  }

  findAll(): Promise<PayAndBenefit[]> {
    return this.payAndBenefitRepository.find();
  }

  async findOne(pay_and_benefits_id: number): Promise<PayAndBenefit> {
    const pay_and_benefits = await this.payAndBenefitRepository.findOneBy({ pay_and_benefits_id });
    if (!pay_and_benefits) {
      throw new NotFoundException(`Pay and benefits with ID ${pay_and_benefits_id} not found`);
    }
    return pay_and_benefits;
  }

  async update(pay_and_benefits_id: number, updatePayAndBenefitDto: UpdatePayAndBenefitDto): Promise<PayAndBenefit> {
    const result = await this.payAndBenefitRepository.update(pay_and_benefits_id, updatePayAndBenefitDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Pay and benefits with ID ${pay_and_benefits_id} not found`);
    }
    return this.findOne(pay_and_benefits_id);
  }

  async remove(pay_and_benefits_id: number): Promise<void> {
    const result = await this.payAndBenefitRepository.delete(pay_and_benefits_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pay and benefits with ID ${pay_and_benefits_id} not found`);
    }
  }
}