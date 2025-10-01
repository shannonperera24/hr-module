import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { EmployeesModule } from './employees/employees.module';
import { ArmyRankModule } from './army_rank/army_rank.module';
import { CorpAndRegimentModule } from './corp_and_regiment/corp_and_regiment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'password',
      username: 'postgres',
      database: 'sl_army_hr_module',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
    }),
    UsersModule,
    EmployeesModule,
    ArmyRankModule,
    CorpAndRegimentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
