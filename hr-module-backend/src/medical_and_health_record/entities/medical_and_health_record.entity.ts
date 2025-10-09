import { Employee } from "src/employees/entities/employee.entity";
import { MedicalFitnessCategory } from "src/medical_fitness_category/entities/medical_fitness_category.entity";
import { MedicalHistory } from "src/medical_history/entities/medical_history.entity";
import { Check, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum BloodGroup {
    A_Pos = 'A+',
    A_Neg = 'A-',
    B_Pos = 'B+', 
    B_Neg = 'B-',
    AB_Pos = 'AB+',
    AB_Neg = 'AB-',
    O_Pos = 'O+',
    O_Neg = 'O-'
}

@Entity('medical_and_health_record')
@Check(`"height_cm" > 0`)
@Check(`"weight_kg" > 0`)
@Check(`"bmi" > 0`)
export class MedicalAndHealthRecord {
    @PrimaryGeneratedColumn()
    medical_and_health_record_id: number;

    @Column({ type: 'enum', enum: BloodGroup, enumName: 'blood_group_enum' })
    blood_group: BloodGroup;

    @Column({ type: 'numeric', precision: 5, scale: 2 })
    height_cm: number;

    @Column({ type: 'numeric', precision: 5, scale: 2 })
    weight_kg: number;

    @Column({ type: 'numeric', precision: 5, scale: 2 })
    bmi: number;

    @Column({ type: 'date'})
    medical_check_date: Date;

    @Column({ type: 'text', nullable: true })
    disability?: string;

    @Column()
    emp_no: number;    

    @OneToOne(() => Employee, (employee) => employee.medical_and_health_record )
    @JoinColumn({ name: 'emp_no' })
    employee: Employee;

    @Column()
    medical_fitness_category_id: number;    

    @ManyToOne(() => MedicalFitnessCategory)
    @JoinColumn({ name: 'medical_fitness_category_id' })
    medical_fitness_category: MedicalFitnessCategory;

    @OneToMany(() => MedicalHistory, medical_history => medical_history.medical_and_health_record)
    medical_histories: MedicalHistory[];
}