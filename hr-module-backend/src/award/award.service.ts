import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAwardDto } from './dto/create-award.dto';
import { UpdateAwardDto } from './dto/update-award.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Award } from './entities/award.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AwardService {
  constructor(
    @InjectRepository(Award)
    private awardRepository: Repository<Award>
  ) {}

  async create(createAwardDto: CreateAwardDto): Promise<Award> {
    const award = this.awardRepository.create(createAwardDto);
    return this.awardRepository.save(award);
  }

  findAll(): Promise<Award[]> {
    return this.awardRepository.find();
  }

  async findOne(award_id: number): Promise<Award> {
    const award = await this.awardRepository.findOneBy({ award_id });
    if (!award) {
      throw new NotFoundException(`Award with ID ${award_id} not found`);
    }
    return award;
  }

  async update(award_id: number, updateAwardDto: UpdateAwardDto): Promise<Award> {
    const result = await this.awardRepository.update(award_id, updateAwardDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Award with ID ${award_id} not found`);
    }
    return this.findOne(award_id);
  }

  async remove(award_id: number): Promise<void> {
    const result = await this.awardRepository.delete(award_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Award with ID ${award_id} not found`);
    }
  }
}