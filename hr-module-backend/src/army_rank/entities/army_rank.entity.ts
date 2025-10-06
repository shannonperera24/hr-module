import { Posting } from "src/posting/entities/posting.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('army_rank')
export class ArmyRank {
    @PrimaryGeneratedColumn()
    rank_id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    rank_name: string;

    @OneToMany(() => Posting, posting => posting.army_rank)
    postings: Posting[];
}
