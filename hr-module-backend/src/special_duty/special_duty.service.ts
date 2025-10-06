import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpecialDutyDto } from './dto/create-special_duty.dto';
import { UpdateSpecialDutyDto } from './dto/update-special_duty.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecialDuty } from './entities/special_duty.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SpecialDutyService {
  constructor(
    @InjectRepository(SpecialDuty)
    private specialDutyRepository: Repository<SpecialDuty>
  ) {}
    
  async create(createSpecialDutyDto: CreateSpecialDutyDto): Promise<SpecialDuty> {
    const special_duty = this.specialDutyRepository.create(createSpecialDutyDto);
    return this.specialDutyRepository.save(special_duty);
  }

  findAll(): Promise<SpecialDuty[]> {
    return this.specialDutyRepository.find();
  }

  async findOne(special_duty_id: number): Promise<SpecialDuty> {
    const special_duty = await this.specialDutyRepository.findOneBy({ special_duty_id });
    if (!special_duty) {
      throw new NotFoundException(`Special duty with ID ${special_duty_id} not found`);
    }
    return special_duty;
  }

  async update(special_duty_id: number, updateSpecialDutyDto: UpdateSpecialDutyDto): Promise<SpecialDuty> {
    const result = await this.specialDutyRepository.update(special_duty_id, updateSpecialDutyDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Special duty with ID ${special_duty_id} not found`);
    }
    return this.findOne(special_duty_id);
  }

  async remove(special_duty_id: number): Promise <void> {
    const result = await this.specialDutyRepository.delete(special_duty_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Special duty with ID ${special_duty_id} not found`);
    }
  }
}
