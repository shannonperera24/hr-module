import { ArmyTrainingCourse } from "src/army_training_course/entities/army_training_course.entity";
import { QualificationRecord } from "src/qualification_record/entities/qualification_record.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('qualification_army_training_course')
@Unique(['qualification_record_id', 'course_id'])
export class QualificationArmyTrainingCourse {
    @PrimaryGeneratedColumn()
    qualification_course_id: number;

    @Column()
    qualification_record_id: number;
    
    @ManyToOne(() => QualificationRecord)
    @JoinColumn({ name: 'qualification_record_id' })
    qualification_record: QualificationRecord;

    @Column()
    course_id: number;
    
    @ManyToOne(() => ArmyTrainingCourse)
    @JoinColumn({ name: 'course_id' })
    army_training_course: ArmyTrainingCourse;

    @Column({ type: 'varchar', length: 150 })
    course_institution: string;

    @Column({ type: 'date' })
    course_date_completed: Date;
}