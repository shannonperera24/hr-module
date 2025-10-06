import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceHistoryDto } from './dto/create-service_history.dto';
import { UpdateServiceHistoryDto } from './dto/update-service_history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceHistory } from './entities/service_history.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceHistoryService {
  constructor(
    @InjectRepository(ServiceHistory)
    private servHistoryRepository: Repository<ServiceHistory>
  ) {}
    
  async create(createServiceHistoryDto: CreateServiceHistoryDto): Promise<ServiceHistory> {
    const service_history = this.servHistoryRepository.create(createServiceHistoryDto);
    return this.servHistoryRepository.save(service_history);
  }

  findAll(): Promise<ServiceHistory[]> {
    return this.servHistoryRepository.find();
  }

  async findOne(service_history_id: number): Promise<ServiceHistory> {
    const service_history = await this.servHistoryRepository.findOneBy({ service_history_id });
    if (!service_history) {
      throw new NotFoundException(`Service history with ID ${service_history_id} not found`);
    }
    return service_history;
  }

  async update(service_history_id: number, updateServiceHistoryDto: UpdateServiceHistoryDto): Promise<ServiceHistory> {
    const result = await this.servHistoryRepository.update(service_history_id, updateServiceHistoryDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Service history with ID ${service_history_id} not found`);
    }
    return this.findOne(service_history_id);
  }

  async remove(service_history_id: number): Promise <void> {
    const result = await this.servHistoryRepository.delete(service_history_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Service history with ID ${service_history_id} not found`);
    }
  }
}