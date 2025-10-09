import { Module } from '@nestjs/common';
import { ForeignMissionService } from './foreign_mission.service';
import { ForeignMissionController } from './foreign_mission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForeignMission } from './entities/foreign_mission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ForeignMission])],
  controllers: [ForeignMissionController],
  providers: [ForeignMissionService],
})
export class ForeignMissionModule {}
