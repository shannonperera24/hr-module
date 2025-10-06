import { Module } from '@nestjs/common';
import { ServiceHistoryService } from './service_history.service';
import { ServiceHistoryController } from './service_history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceHistory } from './entities/service_history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceHistory])],
  controllers: [ServiceHistoryController],
  providers: [ServiceHistoryService],
})
export class ServiceHistoryModule {}
