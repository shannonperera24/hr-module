import { MedicalAndHealthRecord } from "src/medical_and_health_record/entities/medical_and_health_record.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('medical_history')
export class MedicalHistory {
    @PrimaryGeneratedColumn()
    medical_history_id: number;

    @Column({ type: 'date'})
    medical_history_date: Date;

    @Column({ type: 'text' })
    medical_history_description: string;

    @Column()
    medical_and_health_record_id: number;    

    @ManyToOne(() => MedicalAndHealthRecord)
    @JoinColumn({ name: 'medical_and_health_record_id' })
    medical_and_health_record: MedicalAndHealthRecord;
}