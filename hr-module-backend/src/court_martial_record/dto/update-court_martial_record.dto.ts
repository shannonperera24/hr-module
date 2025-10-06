import { PartialType } from '@nestjs/mapped-types';
import { CreateCourtMartialRecordDto } from './create-court_martial_record.dto';

export class UpdateCourtMartialRecordDto extends PartialType(CreateCourtMartialRecordDto) {}
