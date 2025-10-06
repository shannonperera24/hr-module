import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostingDto } from './dto/create-posting.dto';
import { UpdatePostingDto } from './dto/update-posting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Posting } from './entities/posting.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostingService {
  constructor(
    @InjectRepository(Posting)
    private postingRepository: Repository<Posting>
  ) {}
    
  async create(createPostingDto: CreatePostingDto): Promise<Posting> {
    const posting = this.postingRepository.create(createPostingDto);
    return this.postingRepository.save(posting);
  }

  findAll(): Promise<Posting[]> {
    return this.postingRepository.find();
  }

  async findOne(posting_id: number): Promise<Posting> {
    const posting = await this.postingRepository.findOneBy({ posting_id });
    if (!posting) {
      throw new NotFoundException(`Posting with ID ${posting_id} not found`);
    }
    return posting;
  }

  async update(posting_id: number, updatePostingDto: UpdatePostingDto): Promise<Posting> {
    const result = await this.postingRepository.update(posting_id, updatePostingDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Posting with ID ${posting_id} not found`);
    }
    return this.findOne(posting_id);
  }

  async remove(posting_id: number): Promise <void> {
    const result = await this.postingRepository.delete(posting_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Posting with ID ${posting_id} not found`);
    }
  }
}
