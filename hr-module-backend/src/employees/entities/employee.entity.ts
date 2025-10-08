import { CourtMartialRecord } from "src/court_martial_record/entities/court_martial_record.entity";
import { DisciplinaryAction } from "src/disciplinary_action/entities/disciplinary_action.entity";
import { EmployeeClearance } from "src/employee_clearance/entities/employee_clearance.entity";
import { PayAndBenefit } from "src/pay_and_benefits/entities/pay_and_benefit.entity";
import { Posting } from "src/posting/entities/posting.entity";
import { QualificationRecord } from "src/qualification_record/entities/qualification_record.entity";
import { ServiceHistory } from "src/service_history/entities/service_history.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum Gender {
    Male = 'Male',
    Female = 'Female'
}

export enum MaritalStatus {
    Single = 'Single',
    Married = 'Married',
    Widowed = 'Widowed'
}

@Entity('employee')
export class Employee {
    @PrimaryGeneratedColumn()
    emp_no: number;

    @Column({ type: 'varchar', length: 12, unique: true })
    nic_no: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    passport_no?: string;

    @Column({ type: 'varchar', length: 100 })
    full_name: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    name_in_sinhala?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    name_in_tamil?: string;

    @Column({ type: 'date'})
    date_of_birth: Date;

    @Column({ type: 'enum', enum: Gender, enumName: 'gender_enum' })
    gender: Gender;

    @Column({ type: 'enum', enum: MaritalStatus, enumName: 'marital_status_enum' })
    marital_status: MaritalStatus;

    @Column({ type: 'varchar', length: 100, nullable: true })
    spouse_name?: string;

    @Column({ type: 'int', default: 0 })
    number_of_children: number;

    @Column({ type: 'varchar', length: 20 })
    religion: string;

    @Column({ type: 'varchar', length: 50, default: 'Sri Lankan' })
    nationality: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    photo_id?: string;

    @OneToOne(() => User, (user) => user.employee)
    user: User;

    @OneToOne(() => PayAndBenefit, (pay_and_benefits) => pay_and_benefits.employee)
    pay_and_benefits: PayAndBenefit;

    @OneToOne(() => ServiceHistory, (service_history) => service_history.employee)
    service_history: ServiceHistory;

    @OneToOne(() => QualificationRecord, (qualification_record) => qualification_record.employee)
    qualification_record: QualificationRecord;

    @OneToMany(() => DisciplinaryAction, disciplinary_action => disciplinary_action.employee)
    disciplinary_actions: DisciplinaryAction[];

    @OneToMany(() => CourtMartialRecord, court_martial_record => court_martial_record.employee)
    court_martial_records: CourtMartialRecord[];

    @OneToMany(() => Posting, posting => posting.employee)
    postings: Posting[];

    @OneToMany(() => EmployeeClearance, employee_clearance => employee_clearance.employee)
    employee_clearances: EmployeeClearance[];
}