import { Posting } from "src/posting/entities/posting.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('overseas_posting')
export class OverseasPosting {
    @PrimaryGeneratedColumn()
    overseas_posting_id: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    overseas_posting_type: string;

    @Column({ type: 'varchar', length: 50 })
    overseas_posting_country: string;

    @Column({ type: 'varchar', length: 200 })
    overseas_posting_description: string;

    @OneToMany(() => Posting, posting => posting.overseas_posting)
    postings: Posting[];
}
