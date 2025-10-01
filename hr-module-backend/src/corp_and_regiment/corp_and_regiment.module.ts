import { Module } from '@nestjs/common';
import { CorpAndRegimentService } from './corp_and_regiment.service';
import { CorpAndRegimentController } from './corp_and_regiment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CorpAndRegiment } from './entities/corp_and_regiment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CorpAndRegiment])],
  controllers: [CorpAndRegimentController],
  providers: [CorpAndRegimentService],
})
export class CorpAndRegimentModule {}
