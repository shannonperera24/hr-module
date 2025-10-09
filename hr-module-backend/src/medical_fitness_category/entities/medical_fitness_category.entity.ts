import { MedicalAndHealthRecord } from "src/medical_and_health_record/entities/medical_and_health_record.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('medical_fitness_category')
export class MedicalFitnessCategory {
    @PrimaryGeneratedColumn()
    medical_fitness_category_id: number;
    
    @Column({ type: 'varchar', length: 5, unique: true })
    fitness_category_name: string;

    @Column({ type: 'text' })
    fitness_category_description: string;

    @OneToMany(() => MedicalAndHealthRecord, medical_and_health_record => medical_and_health_record.medical_fitness_category)
    medical_and_health_records: MedicalAndHealthRecord[];
}