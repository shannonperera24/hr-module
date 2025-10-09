import { Module } from '@nestjs/common';
import { SportingAchievementService } from './sporting_achievement.service';
import { SportingAchievementController } from './sporting_achievement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SportingAchievement } from './entities/sporting_achievement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SportingAchievement])],
  controllers: [SportingAchievementController],
  providers: [SportingAchievementService],
})
export class SportingAchievementModule {}
