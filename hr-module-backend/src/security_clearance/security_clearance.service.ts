import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSecurityClearanceDto } from './dto/create-security_clearance.dto';
import { UpdateSecurityClearanceDto } from './dto/update-security_clearance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SecurityClearance } from './entities/security_clearance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SecurityClearanceService {
  constructor(
    @InjectRepository(SecurityClearance)
    private secClearanceRepository: Repository<SecurityClearance>
  ) {}

  async create(createSecurityClearanceDto: CreateSecurityClearanceDto): Promise<SecurityClearance> {
    const security_clearance = this.secClearanceRepository.create(createSecurityClearanceDto);
    return this.secClearanceRepository.save(security_clearance);
  }

  findAll(): Promise<SecurityClearance[]> {
    return this.secClearanceRepository.find();
  }

  async findOne(security_clearance_id: number): Promise<SecurityClearance> {
    const security_clearance = await this.secClearanceRepository.findOneBy({ security_clearance_id });
    if (!security_clearance) {
      throw new NotFoundException(`Security clearance with ID ${security_clearance_id} not found`);
    }
    return security_clearance;
  }

  async update(security_clearance_id: number, updateSecurityClearanceDto: UpdateSecurityClearanceDto): Promise<SecurityClearance> {
    const result = await this.secClearanceRepository.update(security_clearance_id, updateSecurityClearanceDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Security clearance with ID ${security_clearance_id} not found`);
    }
    return this.findOne(security_clearance_id);
  }

  async remove(security_clearance_id: number): Promise<void> {
    const result = await this.secClearanceRepository.delete(security_clearance_id);
    if (result.affected === 0) {
      throw new NotFoundException(`Security clearance with ID ${security_clearance_id} not found`);
    }
  }
}
