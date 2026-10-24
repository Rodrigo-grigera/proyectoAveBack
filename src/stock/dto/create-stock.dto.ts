import { IsDateString, IsInt, IsPositive, Min } from "class-validator";


export class StockDto {
  @IsInt()
  @IsPositive()
  id_producto!: number;

  @IsInt()
  @IsPositive()
  id_deposito!: number;

  @IsDateString()
  fecha_vencimiento!: string;

  @IsInt()
  @Min(0)
  cantidad_bulto!: number;

  @IsInt()
  @Min(0)
  cantidad_unidades!: number;
}
