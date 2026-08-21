import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { ProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Producto } from './entities/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseDto } from '../responseDto';
import { Categoria } from 'src/categoria/entities/categoria.entity';


@Injectable()
export class ProductoService {
  constructor(@InjectRepository(Producto) private readonly producRepository: Repository<Producto>,
    @InjectRepository(Categoria) private readonly categoriaRepository: Repository<Categoria>,) { };

  async create(producto: ProductoDto): Promise<ResponseDto<Producto>> {
    const categoria = await this.categoriaRepository.findOne({
      where: {
        id_categoria: producto.id_categoria,
      },
    });

    if (!categoria) {
      throw new NotFoundException('La categoría no existe');
    }

    const newProducto = this.producRepository.create({
      nombre: producto.nombre,
      marca: producto.marca,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      categoria,
    });

    const productoGuardado = await this.producRepository.save(newProducto);

    return {
      code: HttpStatus.CREATED,
      message: 'Producto creado con éxito',
    };
  }

  async findAll(): Promise<ResponseDto<Producto>> {
    const resp = await this.producRepository.find();
    if (!resp || resp.length === 0) throw new NotFoundException('No se encontraron productos');
    return {
      code: HttpStatus.OK,
      message: 'Todos los productos',
      data: resp
    };
  }

  async findProdCategory(idCateg: number): Promise<ResponseDto<Producto>> {
    const resp = await this.producRepository.find({
      where: {
        categoria: { id_categoria: idCateg },
      },
      relations: {
        categoria: true
      }
    })

    if (!resp || resp.length === 0) throw new NotFoundException('No se encontraron productos de esa cartegoria')
    return {
      code: HttpStatus.OK,
      message: 'Productos encontrados',
      data: resp,
    };
  }


  async findOne(id: number): Promise<ResponseDto<Producto>> {
    const resp = await this.producRepository.findOne({ where: { id_producto: id } });
    if (!resp) throw new NotFoundException('No se encontro producto');
    return {
      code: HttpStatus.OK,
      message: `Producto encontrado ${id}`,
      data: resp

    };
  }

  async update(id: number, producto: UpdateProductoDto): Promise<ResponseDto<Producto>> {
    const existingProducto = await this.producRepository.findOne({
      where: { id_producto: id },
    });
    if (!existingProducto) {
      throw new NotFoundException('Producto no encontrado');
    }
    Object.assign(existingProducto, producto);
    const updatedProducto = await this.producRepository.save(existingProducto);

    return {
      code: HttpStatus.NO_CONTENT,
      message: 'Producto modificado con exito'
    };
  }

  async remove(id: number): Promise<ResponseDto<Producto>> {
    const resp = await this.producRepository.softDelete(id)
    if (!resp) throw new NotFoundException('No se pudo eliminar el ptoducto');
    return {
      code: HttpStatus.NO_CONTENT,
      message: 'Producto eliminado'
    };
  }

  async restore(id: number): Promise<ResponseDto<Producto>> {
    const resp = await this.producRepository.restore(id)
    if (!resp) throw new NotFoundException('No se pudo restaurar el producto');
    return {
      code: HttpStatus.NO_CONTENT,
      message: 'Producto restaurado'
    };
  }
}
