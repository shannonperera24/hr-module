import { Module } from '@nestjs/common';
import { OverseasPostingService } from './overseas_posting.service';
import { OverseasPostingController } from './overseas_posting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OverseasPosting } from './entities/overseas_posting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OverseasPosting])],
  controllers: [OverseasPostingController],
  providers: [OverseasPostingService],
})
export class OverseasPostingModule {}
