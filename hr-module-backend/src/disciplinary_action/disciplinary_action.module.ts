import { Module } from '@nestjs/common';
import { DisciplinaryActionService } from './disciplinary_action.service';
import { DisciplinaryActionController } from './disciplinary_action.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisciplinaryAction } from './entities/disciplinary_action.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DisciplinaryAction])],
  controllers: [DisciplinaryActionController],
  providers: [DisciplinaryActionService],
})
export class DisciplinaryActionModule {}
