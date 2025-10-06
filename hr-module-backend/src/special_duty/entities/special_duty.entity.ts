import { Posting } from "src/posting/entities/posting.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('special_duty')
export class SpecialDuty {
    @PrimaryGeneratedColumn()
    special_duty_id: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    special_duty_type: string;

    @Column({ type: 'varchar', length: 200 })
    special_duty_description: string;

    @OneToMany(() => Posting, posting => posting.special_duty)
    postings: Posting[];
}
