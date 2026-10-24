import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseDto } from 'src/responseDto';
import { Producto } from 'src/producto/entities/producto.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
    @InjectRepository(Producto)
    private readonly produRepository: Repository<Producto>,
  ) {}

  async create(createStockDto: StockDto): Promise<ResponseDto<Stock>> {
    const ProductoExistente = await this.produRepository.findOne({
      where: { id_producto: createStockDto.id_producto },
    });
    if (!ProductoExistente)
      throw new NotFoundException('El producto no existe');

    const stockExistente = await this.stockRepository.findOne({
      where: {
        id_producto: createStockDto.id_producto,
        fecha_vencimiento: createStockDto.fecha_vencimiento,
      },
    });

    if (stockExistente) {
      throw new ConflictException(
        'Ya existe un conteo para este producto en esa fecha',
      );
    }
    const conteo_stock = this.stockRepository.create(createStockDto);
    const saveStock = await this.stockRepository.save(conteo_stock);
    return {
      code: HttpStatus.CREATED,
      message: 'Conteo guardado con exito',
    };
  }

  async findAll(): Promise<ResponseDto<Stock>> {
    const resp = await this.stockRepository.find({
      relations: {
        producto: true,
      },
    });
    if (!resp || resp.length === 0) {
      throw new NotFoundException('No hay stock guardados');
    }

    return {
      code: HttpStatus.OK,
      message: 'Todos los stock',
      data: resp,
    };
  }

  async findOne(id: number): Promise<ResponseDto<Stock>> {
    const resp = await this.stockRepository.findOne({
      where: { id_stock: id },
      relations: { producto: true },
    });
    if (!resp) throw new NotFoundException('Conteo de stock no encontrado');
    return {
      code: HttpStatus.OK,
      message: `Stock numero : ${id} encontrado .`,
      data: resp,
    };
  }

  async update(id: number,updateStockDto: UpdateStockDto): Promise<ResponseDto<Stock>> {
    const resp = await this.stockRepository.findOne({
      where: { id_stock: id },
    });

    if (!resp) throw new NotFoundException('Conteo de stock no encontrado');

    Object.assign(resp, updateStockDto);

    const stockActualizado = await this.stockRepository.save(resp);
    return {
      code: HttpStatus.NO_CONTENT,
      message: 'Stock actualizado con exito',
    };
  }

  async remove(id: number): Promise<ResponseDto<Stock>> {
    const resp = await this.stockRepository.findOne({
      where: { id_stock: id },
    });
    if (!resp) throw new NotFoundException('No se encontro el conteo de stock');
    const eliminar = await this.stockRepository.softDelete(resp);
    return {
      code: HttpStatus.NO_CONTENT,
      message: `This action removes a #${id} stock`,
    };
  }

  async restore(id: number): Promise<ResponseDto<Stock>> {
    const resp = await this.stockRepository.findOne({
      where: { id_stock: id },
      withDeleted: true,
    });
    if (!resp) throw new NotFoundException('Conteo de stock no encontrado');
    const restaurado = await this.stockRepository.restore(resp);
    return {
      code: HttpStatus.OK,
      message: 'Conteo de stock restaurado correctamente'
    };
  }
}
