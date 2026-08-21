import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { ResponseDto } from 'src/responseDto';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaService {
  constructor(@InjectRepository(Categoria) private readonly categoriaRepository: Repository<Categoria>) { }

  async create(categoria: CategoriaDto): Promise <ResponseDto<Categoria>> {
    const newCategoria = this.categoriaRepository.create(categoria);
    if (!newCategoria) throw new NotFoundException('No se pudo crear la categoria')
    const saveCategoria = await this.categoriaRepository.save(newCategoria);
    return {
      code: HttpStatus.CREATED,
      message: 'Categoria creada con exito',
    };
  }

  async findAll(): Promise<ResponseDto<Categoria>> {
    const categorias = await this.categoriaRepository.find();
    if(!categorias || categorias.length === 0) throw new NotFoundException('No se encontraron categorias')
    return {
      code: HttpStatus.OK,
      message: 'Categorias encontradas',
      data: categorias
    };
  }

  async findOne(id: number): Promise<ResponseDto<Categoria>> {
    const categoria = await this.categoriaRepository.findOne({ where: { id_categoria: id } });
    if (!categoria) throw new NotFoundException('Categoria no encontrada');
    return {
      code: HttpStatus.OK,
      message: 'Categoria encontrada',
      data: categoria
    };
  }

  async update(id: number, categoria: UpdateCategoriaDto): Promise<ResponseDto<Categoria>> {
    const existingCategoria = await this.categoriaRepository.findOne({ where: { id_categoria: id } });
    if (!existingCategoria) throw new NotFoundException('Categoria no encontrada');
    Object.assign(existingCategoria, categoria);
    const updatedCategoria = await this.categoriaRepository.save(existingCategoria);
    return {
      code: HttpStatus.OK,
      message: 'Categoria actualizada',
      data: updatedCategoria
    };
  }

  async remove(id: number): Promise<ResponseDto<Categoria>> {
    const categoria = await this.categoriaRepository.findOne({ where: { id_categoria: id } });
    if (!categoria) throw new NotFoundException('Categoria no encontrada');
    await this.categoriaRepository.softDelete(id);
    return {
      code: HttpStatus.OK,
      message: 'Categoria eliminada',
    };
  }

  async restore(id: number): Promise<ResponseDto<Categoria>> {
    const categoria = await this.categoriaRepository.findOne({ where: { id_categoria: id }, withDeleted: true });
    if (!categoria) throw new NotFoundException('Categoria no encontrada');
    await this.categoriaRepository.restore(id);
    return {
      code: HttpStatus.OK,
      message: 'Categoria restaurada',
      data: categoria
    };
  }
}
