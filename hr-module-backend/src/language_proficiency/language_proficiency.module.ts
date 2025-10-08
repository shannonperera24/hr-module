import { Module } from '@nestjs/common';
import { LanguageProficiencyService } from './language_proficiency.service';
import { LanguageProficiencyController } from './language_proficiency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageProficiency } from './entities/language_proficiency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageProficiency])],
  controllers: [LanguageProficiencyController],
  providers: [LanguageProficiencyService],
})
export class LanguageProficiencyModule {}
