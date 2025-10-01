import { Module } from '@nestjs/common';
import { ArmyRankService } from './army_rank.service';
import { ArmyRankController } from './army_rank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArmyRank } from './entities/army_rank.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArmyRank])],
  controllers: [ArmyRankController],
  providers: [ArmyRankService],
})
export class ArmyRankModule {}
