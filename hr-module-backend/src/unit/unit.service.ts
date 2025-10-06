import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>
  ) {}

  async create(createUnitDto: CreateUnitDto): Promise<Unit> {
    const unit = this.unitRepository.create(createUnitDto);
    return this.unitRepository.save(unit);
  }

  findAll(): Promise<Unit[]> {
    return this.unitRepository.find();
  }

  async findOne(unit_id: number): Promise<Unit> {
    const unit = await this.unitRepository.findOneBy({ unit_id });
    if (!unit) {
      throw new NotFoundException(`Unit with ID ${unit_id} not found`);
    }
    return unit;
  }

  async update(unit_id: number, updateUnitDto: UpdateUnitDto): Promise<Unit> {
    const result = await this.unitRepository.update(unit_id, updateUnitDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Unit with ID ${unit_id} not found`);
    }
    return this.findOne(unit_id);
  }

  async remove(unit_id: number): Promise<void> {
    const result = await this.unitRepository.delete(unit_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Unit with ID ${unit_id} not found`);
    }
  }
}
