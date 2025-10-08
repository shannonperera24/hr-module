import { Module } from '@nestjs/common';
import { QualificationLanguageService } from './qualification_language.service';
import { QualificationLanguageController } from './qualification_language.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualificationLanguage } from './entities/qualification_language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QualificationLanguage])],
  controllers: [QualificationLanguageController],
  providers: [QualificationLanguageService],
})
export class QualificationLanguageModule {}
