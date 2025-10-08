import { LanguageProficiency } from "src/language_proficiency/entities/language_proficiency.entity";
import { QualificationRecord } from "src/qualification_record/entities/qualification_record.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('qualification_language')
export class QualificationLanguage {
    @PrimaryGeneratedColumn()
    qualification_language_id: number;

    @Column()
    qualification_record_id: number;
    
    @ManyToOne(() => QualificationRecord)
    @JoinColumn({ name: 'qualification_record_id' })
    qualification_record: QualificationRecord;

    @Column()
    language_id: number;
    
    @ManyToOne(() => LanguageProficiency)
    @JoinColumn({ name: 'language_id' })
    language_proficiency: LanguageProficiency;

    @Column({ type: 'varchar', length: 50 })
    language_proficiency_level: string;
}