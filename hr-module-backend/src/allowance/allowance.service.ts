import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAllowanceDto } from './dto/create-allowance.dto';
import { UpdateAllowanceDto } from './dto/update-allowance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Allowance } from './entities/allowance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AllowanceService {
  constructor(
    @InjectRepository(Allowance)
    private allowanceRepository: Repository<Allowance>
  ) {}

  async create(createAllowanceDto: CreateAllowanceDto): Promise<Allowance> {
    const allowance = this.allowanceRepository.create(createAllowanceDto);
    return this.allowanceRepository.save(allowance);
  }
  
  findAll(): Promise<Allowance[]> {
    return this.allowanceRepository.find();
  }

  async findOne(allowance_id: number): Promise<Allowance> {
    const allowance = await this.allowanceRepository.findOneBy({ allowance_id });
    if (!allowance) {
      throw new NotFoundException(`Allowance with ID ${allowance_id} not found`);
    }
    return allowance;
  }

  async update(allowance_id: number, updateAllowanceDto: UpdateAllowanceDto): Promise<Allowance> {
    const result = await this.allowanceRepository.update(allowance_id, updateAllowanceDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Allowance with ID ${allowance_id} not found`);
    }
    return this.findOne(allowance_id);
  }

  async remove(allowance_id: number): Promise <void> {
    const result = await this.allowanceRepository.delete(allowance_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Allowance with ID ${allowance_id} not found`);
    }
  }
}
  