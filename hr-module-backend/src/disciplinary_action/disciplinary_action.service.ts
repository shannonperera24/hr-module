import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDisciplinaryActionDto } from './dto/create-disciplinary_action.dto';
import { UpdateDisciplinaryActionDto } from './dto/update-disciplinary_action.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DisciplinaryAction } from './entities/disciplinary_action.entity';

@Injectable()
export class DisciplinaryActionService {
  constructor(
    @InjectRepository(DisciplinaryAction)
    private disActionRepository: Repository<DisciplinaryAction>
  ) {}
    
  async create(createDisciplinaryActionDto: CreateDisciplinaryActionDto): Promise<DisciplinaryAction> {
    const disciplinary_action = this.disActionRepository.create(createDisciplinaryActionDto);
    return this.disActionRepository.save(disciplinary_action);
  }

  findAll(): Promise<DisciplinaryAction[]> {
    return this.disActionRepository.find();
  }

  async findOne(action_id: number): Promise<DisciplinaryAction> {
    const disciplinary_action = await this.disActionRepository.findOneBy({ action_id });
    if (!disciplinary_action) {
      throw new NotFoundException(`Disciplinary action with ID ${action_id} not found`);
    }
    return disciplinary_action;
  }

  async update(action_id: number, updateDisciplinaryActionDto: UpdateDisciplinaryActionDto): Promise<DisciplinaryAction> {
    const result = await this.disActionRepository.update(action_id, updateDisciplinaryActionDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Disciplinary action with ID ${action_id} not found`);
    }
    return this.findOne(action_id);
  }

  async remove(action_id: number): Promise <void> {
    const result = await this.disActionRepository.delete(action_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Disciplinary action with ID ${action_id} not found`);
    }
  }
}