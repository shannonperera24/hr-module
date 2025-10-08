import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalLoanDto } from './create-personal_loan.dto';

export class UpdatePersonalLoanDto extends PartialType(CreatePersonalLoanDto) {}
