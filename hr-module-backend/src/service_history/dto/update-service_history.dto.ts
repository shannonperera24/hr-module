import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceHistoryDto } from './create-service_history.dto';

export class UpdateServiceHistoryDto extends PartialType(CreateServiceHistoryDto) {}
