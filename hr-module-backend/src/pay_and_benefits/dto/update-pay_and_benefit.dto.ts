import { PartialType } from '@nestjs/mapped-types';
import { CreatePayAndBenefitDto } from './create-pay_and_benefit.dto';

export class UpdatePayAndBenefitDto extends PartialType(CreatePayAndBenefitDto) {}
