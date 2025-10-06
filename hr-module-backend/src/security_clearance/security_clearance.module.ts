import { Module } from '@nestjs/common';
import { SecurityClearanceService } from './security_clearance.service';
import { SecurityClearanceController } from './security_clearance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecurityClearance } from './entities/security_clearance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SecurityClearance])],
  controllers: [SecurityClearanceController],
  providers: [SecurityClearanceService],
})
export class SecurityClearanceModule {}
