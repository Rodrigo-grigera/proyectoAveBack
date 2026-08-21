import { PartialType } from '@nestjs/mapped-types';
import { CategoriaDto } from './create-categoria.dto';

export class UpdateCategoriaDto extends PartialType(CategoriaDto) {}
