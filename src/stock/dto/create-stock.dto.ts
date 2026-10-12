import { IsDateString, IsInt, IsPositive, Min } from "class-validator";


export class StockDto {
  @IsInt()
  @IsPositive()
  id_producto!: number;

  @IsDateString()
  fecha!: string;

  @IsInt()
  @Min(0)
  cantidad_bulto!: number;

  @IsInt()
  @Min(0)
  cantidad_unidades!: number;
}
