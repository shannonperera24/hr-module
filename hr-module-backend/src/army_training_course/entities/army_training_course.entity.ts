import { QualificationArmyTrainingCourse } from "src/qualification_army_training_course/entities/qualification_army_training_course.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('army_training_course')
export class ArmyTrainingCourse {
    @PrimaryGeneratedColumn()
    course_id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    course_name: string;

    @OneToMany(() => QualificationArmyTrainingCourse, qualification_army_training_course => qualification_army_training_course.army_training_course)
    qualification_army_training_courses: QualificationArmyTrainingCourse[];
}
