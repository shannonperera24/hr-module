import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from './entities/promotion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>
  ) {}

  async create(createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    const promotion = this.promotionRepository.create(createPromotionDto);
    return this.promotionRepository.save(promotion);
  }

  findAll(): Promise<Promotion[]> {
    return this.promotionRepository.find();
  }

  async findOne(promotion_id: number): Promise<Promotion> {
    const promotion = await this.promotionRepository.findOneBy({ promotion_id });
    if (!promotion) {
      throw new NotFoundException(`Promotion with ID ${promotion_id} not found`);
    }
    return promotion;
  }

  async update(promotion_id: number, updatePromotionDto: UpdatePromotionDto): Promise<Promotion> {
    const result = await this.promotionRepository.update(promotion_id, updatePromotionDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Promotion with ID ${promotion_id} not found`);
    }
    return this.findOne(promotion_id);
  }

  async remove(promotion_id: number): Promise<void> {
    const result = await this.promotionRepository.delete(promotion_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Promotion with ID ${promotion_id} not found`);
    }
  }
}
  