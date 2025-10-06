import { Module } from '@nestjs/common';
import { PostingService } from './posting.service';
import { PostingController } from './posting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posting } from './entities/posting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posting])],
  controllers: [PostingController],
  providers: [PostingService],
})
export class PostingModule {}
