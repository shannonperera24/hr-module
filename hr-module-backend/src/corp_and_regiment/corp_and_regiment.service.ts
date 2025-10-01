import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCorpAndRegimentDto } from './dto/create-corp_and_regiment.dto';
import { UpdateCorpAndRegimentDto } from './dto/update-corp_and_regiment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CorpAndRegiment } from './entities/corp_and_regiment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CorpAndRegimentService {
  constructor(
    @InjectRepository(CorpAndRegiment)
    private corpAndRegimentRepository: Repository<CorpAndRegiment>
  ) {}

  async create(createCorpAndRegimentDto: CreateCorpAndRegimentDto): Promise<CorpAndRegiment> {
    const corp_and_regiment = this.corpAndRegimentRepository.create(createCorpAndRegimentDto);
    return this.corpAndRegimentRepository.save(corp_and_regiment);
  }

  findAll(): Promise<CorpAndRegiment[]> {
    return this.corpAndRegimentRepository.find();
  }

  async findOne(corp_and_regiment_id: number): Promise<CorpAndRegiment> {
    const corp_and_regiment = await this.corpAndRegimentRepository.findOneBy({ corp_and_regiment_id });
    if (!corp_and_regiment) {
      throw new NotFoundException(`Corp and regiment with ID ${corp_and_regiment_id} not found`);
    }
    return corp_and_regiment;
    
  }

  async update(corp_and_regiment_id: number, updateCorpAndRegimentDto: UpdateCorpAndRegimentDto): Promise<CorpAndRegiment> {
    const result = await this.corpAndRegimentRepository.update(corp_and_regiment_id, updateCorpAndRegimentDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Corp and regiment with ID ${corp_and_regiment_id} not found`);
    }
    return this.findOne(corp_and_regiment_id);
  }

  async remove(corp_and_regiment_id: number): Promise <void> {
    const result = await this.corpAndRegimentRepository.delete(corp_and_regiment_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Corp and regiment with ID ${corp_and_regiment_id} not found`);
    }
  }
}
