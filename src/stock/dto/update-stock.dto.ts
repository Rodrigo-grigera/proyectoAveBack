import { PartialType } from '@nestjs/mapped-types';
import { StockDto } from './create-stock.dto';

export class UpdateStockDto extends PartialType(StockDto) {}
