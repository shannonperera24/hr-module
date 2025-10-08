import { PartialType } from '@nestjs/mapped-types';
import { CreateQualificationRecordDto } from './create-qualification_record.dto';

export class UpdateQualificationRecordDto extends PartialType(CreateQualificationRecordDto) {}
