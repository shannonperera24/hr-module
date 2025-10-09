import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalAndHealthRecordDto } from './create-medical_and_health_record.dto';

export class UpdateMedicalAndHealthRecordDto extends PartialType(CreateMedicalAndHealthRecordDto) {}
