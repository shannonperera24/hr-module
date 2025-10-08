import { EmployeeAllowance } from "src/employee_allowance/entities/employee_allowance.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { PersonalLoan } from "src/personal_loan/entities/personal_loan.entity";
import { Check, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('pay_and_benefits')
@Check(`"basic_pay" >= 0`)
export class PayAndBenefit {
    @PrimaryGeneratedColumn()
    pay_and_benefits_id: number;

    @Column({ type: 'varchar', length: 20, unique: true })
    pay_code: string;

    @Column({ type: 'numeric', precision: 12, scale: 2 })
    basic_pay: number;

    @Column({ type: 'varchar', length: 30 })
    bank_account_no: string;

    @Column({ type: 'varchar', length: 50 })
    bank_name: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    epf_no?: string;

    @Column({ type: 'varchar', length: 30, nullable: true })
    insurance_no?: string;

    @Column()
    emp_no: number;    

    @OneToOne(() => Employee, (employee) => employee.pay_and_benefits )
    @JoinColumn({ name: 'emp_no' })
    employee: Employee;

    @OneToMany(() => EmployeeAllowance, employee_allowance => employee_allowance.pay_and_benefits)
    employee_allowances: EmployeeAllowance[];

    @OneToMany(() => PersonalLoan, personal_loan => personal_loan.pay_and_benefits)
    personal_loans: PersonalLoan[];
}