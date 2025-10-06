import { Posting } from "src/posting/entities/posting.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('appointment')
export class Appointment {
    @PrimaryGeneratedColumn()
    appointment_id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    appointment_name: string;

    @OneToMany(() => Posting, posting => posting.appointment)
    postings: Posting[];
}
