import { Appointment } from "src/appointment/entities/appointment.entity";
import { ArmyRank } from "src/army_rank/entities/army_rank.entity";
import { CorpAndRegiment } from "src/corp_and_regiment/entities/corp_and_regiment.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { OverseasPosting } from "src/overseas_posting/entities/overseas_posting.entity";
import { SpecialDuty } from "src/special_duty/entities/special_duty.entity";
import { Unit } from "src/unit/entities/unit.entity";
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('posting')
@Check(`"to_date" >= "from_date"`)
export class Posting {
    @PrimaryGeneratedColumn()
    posting_id: number;

    @Column({ type: 'date' })
    from_date: Date;

    @Column({ type: 'date' })
    to_date: Date;

    @Column()
    rank_id: number; 

    @ManyToOne(() => ArmyRank )
    @JoinColumn({ name: 'rank_id' })
    army_rank: ArmyRank;

    @Column()
    corp_and_regiment_id: number; 

    @ManyToOne(() => CorpAndRegiment)
    @JoinColumn({ name: 'corp_and_regiment_id' })
    corp_and_regiment: CorpAndRegiment;

    @Column()
    unit_id: number;

    @ManyToOne(() => Unit)
    @JoinColumn({ name: 'unit_id' })
    unit: Unit;

    @Column()
    appointment_id: number;

    @ManyToOne(() => Appointment)
    @JoinColumn({ name: 'appointment_id' })
    appointment: Appointment;

    @Column({ nullable: true })
    special_duty_id?: number;

    @ManyToOne(() => SpecialDuty, { nullable: true })
    @JoinColumn({ name: 'special_duty_id' })
    special_duty?: SpecialDuty;

    @Column({ nullable: true })
    overseas_posting_id?: number;

    @ManyToOne(() => OverseasPosting, { nullable: true })
    @JoinColumn({ name: 'overseas_posting_id' })
    overseas_posting?: OverseasPosting;

    @Column()
    emp_no: number;

    @ManyToOne(() => Employee)
    @JoinColumn({ name: 'emp_no' })
    employee: Employee;
}
