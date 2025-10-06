import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOverseasPostingDto } from './dto/create-overseas_posting.dto';
import { UpdateOverseasPostingDto } from './dto/update-overseas_posting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OverseasPosting } from './entities/overseas_posting.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OverseasPostingService {
  constructor(
    @InjectRepository(OverseasPosting)
    private overseasPostingRepository: Repository<OverseasPosting>
  ) {}

  async create(createOverseasPostingDto: CreateOverseasPostingDto): Promise<OverseasPosting> {
    const overseas_posting = this.overseasPostingRepository.create(createOverseasPostingDto);
    return this.overseasPostingRepository.save(overseas_posting);
  }
  
  findAll(): Promise<OverseasPosting[]> {
    return this.overseasPostingRepository.find();
  }

  async findOne(overseas_posting_id: number): Promise<OverseasPosting> {
    const overseas_posting = await this.overseasPostingRepository.findOneBy({ overseas_posting_id });
    if (!overseas_posting) {
      throw new NotFoundException(`Overseas posting with ID ${overseas_posting_id} not found`);
    }
    return overseas_posting;
  }

  async update(overseas_posting_id: number, updateOverseasPostingDto: UpdateOverseasPostingDto): Promise<OverseasPosting> {
    const result = await this.overseasPostingRepository.update(overseas_posting_id, updateOverseasPostingDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Overseas posting with ID ${overseas_posting_id} not found`);
    }
    return this.findOne(overseas_posting_id);
  }

  async remove(overseas_posting_id: number): Promise <void> {
    const result = await this.overseasPostingRepository.delete(overseas_posting_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Overseas posting with ID ${overseas_posting_id} not found`);
    }
  }
}
