import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { EmployeesModule } from './employees/employees.module';
import { ArmyRankModule } from './army_rank/army_rank.module';
import { CorpAndRegimentModule } from './corp_and_regiment/corp_and_regiment.module';
import { UnitModule } from './unit/unit.module';
import { AppointmentModule } from './appointment/appointment.module';
import { SpecialDutyModule } from './special_duty/special_duty.module';
import { OverseasPostingModule } from './overseas_posting/overseas_posting.module';
import { PostingModule } from './posting/posting.module';
import { SecurityClearanceModule } from './security_clearance/security_clearance.module';
import { EmployeeClearanceModule } from './employee_clearance/employee_clearance.module';
import { ServiceHistoryModule } from './service_history/service_history.module';
import { DisciplinaryActionModule } from './disciplinary_action/disciplinary_action.module';
import { CourtMartialRecordModule } from './court_martial_record/court_martial_record.module';
import { PromotionModule } from './promotion/promotion.module';
import { PayAndBenefitsModule } from './pay_and_benefits/pay_and_benefits.module';
import { AllowanceModule } from './allowance/allowance.module';
import { EmployeeAllowanceModule } from './employee_allowance/employee_allowance.module';
import { PersonalLoanModule } from './personal_loan/personal_loan.module';
import { CivilQualificationModule } from './civil_qualification/civil_qualification.module';
import { ArmyTrainingCourseModule } from './army_training_course/army_training_course.module';
import { LanguageProficiencyModule } from './language_proficiency/language_proficiency.module';
import { ComputerSkillModule } from './computer_skill/computer_skill.module';
import { QualificationRecordModule } from './qualification_record/qualification_record.module';
import { QualificationHasCivilModule } from './qualification_has_civil/qualification_has_civil.module';
import { QualificationArmyTrainingCourseModule } from './qualification_army_training_course/qualification_army_training_course.module';
import { QualificationLanguageModule } from './qualification_language/qualification_language.module';
import { QualificationComputerSkillModule } from './qualification_computer_skill/qualification_computer_skill.module';
import { AwardModule } from './award/award.module';
import { ForeignMissionModule } from './foreign_mission/foreign_mission.module';
import { CommendationModule } from './commendation/commendation.module';
import { SportingAchievementModule } from './sporting_achievement/sporting_achievement.module';
import { EmployeeAwardModule } from './employee_award/employee_award.module';
import { EmployeeForeignMissionModule } from './employee_foreign_mission/employee_foreign_mission.module';
import { EmployeeCommendationModule } from './employee_commendation/employee_commendation.module';
import { EmployeeSportingAchievementModule } from './employee_sporting_achievement/employee_sporting_achievement.module';
import { MedicalFitnessCategoryModule } from './medical_fitness_category/medical_fitness_category.module';
import { MedicalAndHealthRecordModule } from './medical_and_health_record/medical_and_health_record.module';
import { MedicalHistoryModule } from './medical_history/medical_history.module';

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
    UnitModule,
    AppointmentModule,
    SpecialDutyModule,
    OverseasPostingModule,
    PostingModule,
    SecurityClearanceModule,
    EmployeeClearanceModule,
    ServiceHistoryModule,
    DisciplinaryActionModule,
    CourtMartialRecordModule,
    PromotionModule,
    PayAndBenefitsModule,
    AllowanceModule,
    EmployeeAllowanceModule,
    PersonalLoanModule,
    CivilQualificationModule,
    ArmyTrainingCourseModule,
    LanguageProficiencyModule,
    ComputerSkillModule,
    QualificationRecordModule,
    QualificationHasCivilModule,
    QualificationArmyTrainingCourseModule,
    QualificationLanguageModule,
    QualificationComputerSkillModule,
    AwardModule,
    ForeignMissionModule,
    CommendationModule,
    SportingAchievementModule,
    EmployeeAwardModule,
    EmployeeForeignMissionModule,
    EmployeeCommendationModule,
    EmployeeSportingAchievementModule,
    MedicalFitnessCategoryModule,
    MedicalAndHealthRecordModule,
    MedicalHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
