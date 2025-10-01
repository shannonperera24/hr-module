import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArmyRankDto } from './dto/create-army_rank.dto';
import { UpdateArmyRankDto } from './dto/update-army_rank.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArmyRank } from './entities/army_rank.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArmyRankService {
  constructor(
    @InjectRepository(ArmyRank)
    private armyRankRepository: Repository<ArmyRank>
  ) {}
    
  async create(createArmyRankDto: CreateArmyRankDto): Promise<ArmyRank> {
    const army_rank = this.armyRankRepository.create(createArmyRankDto);
    return this.armyRankRepository.save(army_rank);
  }

  findAll(): Promise<ArmyRank[]> {
    return this.armyRankRepository.find();
  }

  async findOne(rank_id: number): Promise<ArmyRank> {
    const army_rank = await this.armyRankRepository.findOneBy({ rank_id });
    if (!army_rank) {
      throw new NotFoundException(`Rank with ID ${rank_id} not found`);
    }
    return army_rank;
  }

  async update(rank_id: number, updateArmyRankDto: UpdateArmyRankDto): Promise<ArmyRank> {
    const result = await this.armyRankRepository.update(rank_id, updateArmyRankDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Rank with ID ${rank_id} not found`);
    }
    return this.findOne(rank_id);
  }

  async remove(rank_id: number): Promise <void> {
    const result = await this.armyRankRepository.delete(rank_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Rank with ID ${rank_id} not found`);
    }
  }
}
