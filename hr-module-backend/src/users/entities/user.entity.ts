import { Employee } from "src/employees/entities/employee.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    Admin = 'Admin',
    HR_Officer = 'HR Officer',
    Commanding_Officer = 'Commanding Officer',
    Medical_Officer = 'Medical Officer'
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 255})
    password_hash: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;

    @Column({ type: 'enum', enum: UserRole, enumName: 'user_role_enum' })
    user_role: UserRole;

    @Column({ type: 'boolean', default: true })
    is_active: boolean;

    @Column({ type: 'int' })
    emp_no: number;
    
    @OneToOne(() => Employee, employee => employee.user, {nullable: false} )
    @JoinColumn({ name: 'emp_no' })
    employee: Employee;
}
