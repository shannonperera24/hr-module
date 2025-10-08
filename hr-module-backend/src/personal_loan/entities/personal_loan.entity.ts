import { PayAndBenefit } from "src/pay_and_benefits/entities/pay_and_benefit.entity";
import { Check, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('personal_loan')
@Check(`"loan_amount" >= 0`)
@Check(`"interest_rate" >= 0`)
@Check(`"repayment_start_date" >= "loan_date"`)
@Check(`"repayment_end_date" IS NULL OR "repayment_end_date" >= "repayment_start_date"`)
export class PersonalLoan {
    @PrimaryGeneratedColumn()
    loan_id: number;

    @Column({ type: 'numeric', precision: 12, scale: 2 })
    loan_amount: number;

    @Column({ type: 'date' })
    loan_date: Date;

    @Column({ type: 'numeric', precision: 5, scale: 2 })
    interest_rate: number;

    @Column({ type: 'date' })
    repayment_start_date: Date;

    @Column({ type: 'date', nullable: true })
    repayment_end_date?: Date;

    @Column()
    pay_and_benefits_id: number;
    
    @ManyToOne(() => PayAndBenefit)
    @JoinColumn({ name: 'pay_and_benefits_id' })
    pay_and_benefits: PayAndBenefit;
}