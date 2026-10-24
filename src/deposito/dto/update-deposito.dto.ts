import { PartialType } from '@nestjs/mapped-types';
import { DepositoDto } from './create-deposito.dto';

export class UpdateDepositoDto extends PartialType(DepositoDto) {}
