import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommendationDto } from './dto/create-commendation.dto';
import { UpdateCommendationDto } from './dto/update-commendation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Commendation } from './entities/commendation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommendationService {
  constructor(
    @InjectRepository(Commendation)
    private commendationRepository: Repository<Commendation>
  ) {}

  async create(createCommendationDto: CreateCommendationDto): Promise<Commendation> {
    const commendation = this.commendationRepository.create(createCommendationDto);
    return this.commendationRepository.save(commendation);
  }

  findAll(): Promise<Commendation[]> {
    return this.commendationRepository.find();
  }

  async findOne(commendation_id: number): Promise<Commendation> {
    const commendation = await this.commendationRepository.findOneBy({ commendation_id });
    if (!commendation) {
      throw new NotFoundException(`Commendation with ID ${commendation_id} not found`);
    }
    return commendation;
  }

  async update(commendation_id: number, updateCommendationDto: UpdateCommendationDto): Promise<Commendation> {
    const result = await this.commendationRepository.update(commendation_id, updateCommendationDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Commendation with ID ${commendation_id} not found`);
    }
    return this.findOne(commendation_id);
  }

  async remove(commendation_id: number): Promise<void> {
    const result = await this.commendationRepository.delete(commendation_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Commendation with ID ${commendation_id} not found`);
    }
  }
}