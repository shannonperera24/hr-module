import { ComputerSkill } from "src/computer_skill/entities/computer_skill.entity";
import { QualificationRecord } from "src/qualification_record/entities/qualification_record.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('qualification_computer_skill')
export class QualificationComputerSkill {
    @PrimaryGeneratedColumn()
    qualification_computer_skill_id: number;

    @Column()
    qualification_record_id: number;
    
    @ManyToOne(() => QualificationRecord)
    @JoinColumn({ name: 'qualification_record_id' })
    qualification_record: QualificationRecord;

    @Column()
    computer_skill_id: number;
    
    @ManyToOne(() => ComputerSkill)
    @JoinColumn({ name: 'computer_skill_id' })
    computer_skill: ComputerSkill;
}
