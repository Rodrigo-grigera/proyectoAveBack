import { IsString, MaxLength, IsOptional } from "class-validator";

export class DepositoDto {
  @IsString()
  @MaxLength(100)
  nombre!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  direccion?: string;
}
