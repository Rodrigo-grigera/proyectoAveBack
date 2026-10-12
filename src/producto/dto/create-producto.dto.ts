import { IsOptional, IsString, MaxLength } from 'class-validator';

export class ProductoDto {

    @IsString()
    @MaxLength(100)
    nombre!: string;

    @IsString()
    @MaxLength(100)
    marca!: string;

    @IsString()
    @MaxLength(500)
    @IsOptional()
    descripcion?: string;
}
