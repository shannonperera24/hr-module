import { Module } from '@nestjs/common';
import { CommendationService } from './commendation.service';
import { CommendationController } from './commendation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Commendation } from './entities/commendation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Commendation])],
  controllers: [CommendationController],
  providers: [CommendationService],
})
export class CommendationModule {}
