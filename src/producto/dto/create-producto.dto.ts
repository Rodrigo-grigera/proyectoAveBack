import { IsInt, IsNumber, IsPositive, IsString, Min } from 'class-validator';
import { DeleteDateColumn } from 'typeorm';

export class ProductoDto {

    @IsString()
    nombre!: string;

    @IsString()
    marca!: string;

    @IsString()
    descripcion!: string;

    @IsNumber()
    @Min(0)
    precio!: number;

    @IsInt()
    @Min(0)
    stock!: number;

    @IsNumber()
    @IsPositive()
    id_categoria!: number;

}
