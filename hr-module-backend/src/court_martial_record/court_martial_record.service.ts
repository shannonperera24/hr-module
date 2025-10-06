import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourtMartialRecordDto } from './dto/create-court_martial_record.dto';
import { UpdateCourtMartialRecordDto } from './dto/update-court_martial_record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CourtMartialRecord } from './entities/court_martial_record.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CourtMartialRecordService {
  constructor(
    @InjectRepository(CourtMartialRecord)
    private courtMartialRecRepository: Repository<CourtMartialRecord>
  ) {}
    
  async create(createCourtMartialRecordDto: CreateCourtMartialRecordDto): Promise<CourtMartialRecord> {
    const court_martial_record = this.courtMartialRecRepository.create(createCourtMartialRecordDto);
    return this.courtMartialRecRepository.save(court_martial_record);
  }

  findAll(): Promise<CourtMartialRecord[]> {
    return this.courtMartialRecRepository.find();
  }

  async findOne(court_martial_record_id: number): Promise<CourtMartialRecord> {
    const court_martial_record = await this.courtMartialRecRepository.findOneBy({ court_martial_record_id });
    if (!court_martial_record) {
      throw new NotFoundException(`Court martial record with ID ${court_martial_record_id} not found`);
    }
    return court_martial_record;
  }

  async update(court_martial_record_id: number, updateCourtMartialRecordDto: UpdateCourtMartialRecordDto): Promise<CourtMartialRecord> {
    const result = await this.courtMartialRecRepository.update(court_martial_record_id, updateCourtMartialRecordDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Court martial record with ID ${court_martial_record_id} not found`);
    }
    return this.findOne(court_martial_record_id);
  }

  async remove(court_martial_record_id: number): Promise <void> {
    const result = await this.courtMartialRecRepository.delete(court_martial_record_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Court martial record with ID ${court_martial_record_id} not found`);
    }
  }
}