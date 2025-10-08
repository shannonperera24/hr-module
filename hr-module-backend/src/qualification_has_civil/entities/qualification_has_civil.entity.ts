import { CivilQualification } from "src/civil_qualification/entities/civil_qualification.entity";
import { QualificationRecord } from "src/qualification_record/entities/qualification_record.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('qualification_has_civil')
export class QualificationHasCivil {
    @PrimaryGeneratedColumn()
    qualification_has_civil_id: number;

    @Column()
    qualification_record_id: number;
    
    @ManyToOne(() => QualificationRecord)
    @JoinColumn({ name: 'qualification_record_id' })
    qualification_record: QualificationRecord;

    @Column()
    civil_qualification_id: number;
    
    @ManyToOne(() => CivilQualification)
    @JoinColumn({ name: 'civil_qualification_id' })
    civil_qualification: CivilQualification;

    @Column({ type: 'varchar', length: 150 })
    civil_qualification_institution: string;

    @Column({ type: 'date' })
    civil_qualification_date_completed: Date;
}