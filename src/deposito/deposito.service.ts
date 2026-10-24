import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DepositoDto } from './dto/create-deposito.dto';
import { UpdateDepositoDto } from './dto/update-deposito.dto';
import { ResponseDto } from 'src/responseDto';
import { Deposito } from './entities/deposito.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DepositoService {
  constructor(@InjectRepository(Deposito) private readonly depositoRepository : Repository <Deposito>) {}

  async create(body: DepositoDto): Promise <ResponseDto<DepositoDto>> {
    const existingDeposito = await this.depositoRepository.findOne({ where: { nombre: body.nombre } });
    if (existingDeposito) {
      throw new NotFoundException('Ya existe un deposito con ese nombre');
    }
    const newDeposito =  this.depositoRepository.create(body);
    if(!newDeposito) throw new NotFoundException('No se pudo crear el deposito')
      const depositoGuardado = await this.depositoRepository.save(newDeposito);

    return {
      code : HttpStatus.CREATED,
      message: 'Deposito creado con exito'
    }
  }

  async findAll() : Promise <ResponseDto<Deposito>> {
    const depositos = await this.depositoRepository.find();
    return {
      code: HttpStatus.OK,
      message: 'Depositos encontrados con exito',
      data: depositos
    };
  }

  async findOne(id: number) : Promise <ResponseDto<Deposito>> {
    const deposito = await this.depositoRepository.findOne({ where: { id_deposito : id } });
    if (!deposito) {
      throw new NotFoundException('Deposito no encontrado');
    }
    return {
      code: HttpStatus.OK,
      message: 'Deposito encontrado con exito',
      data: deposito
    };
  }

  async update(id: number, updateDepositoDto: UpdateDepositoDto) : Promise <ResponseDto<Deposito>> {
    const deposito = await this.depositoRepository.findOne({ where: {id_deposito : id } });
    if (!deposito) {
      throw new NotFoundException('Deposito no encontrado');
    }
    Object.assign(deposito, updateDepositoDto);
    const updatedDeposito = await this.depositoRepository.save(deposito);
    return {
      code: HttpStatus.OK,
      message: 'Deposito actualizado con exito',
      data: updatedDeposito
    };
  }

  async remove(id: number) : Promise <ResponseDto<Deposito>> {
    const deposito = await this.depositoRepository.findOne({ where: {id_deposito : id } });
    if (!deposito) {
      throw new NotFoundException('Deposito no encontrado');
    }
    await this.depositoRepository.remove(deposito);
    return {
      code: HttpStatus.OK,
      message: 'Deposito eliminado con exito',
      data: deposito
    };

  }
  async restore(id: number) : Promise <ResponseDto<Deposito>> {
    const deposito = await this.depositoRepository.findOne({ where: {id_deposito : id } });
    if (!deposito) {
      throw new NotFoundException('Deposito no encontrado');
    }
    await this.depositoRepository.save(deposito);
    return {
      code: HttpStatus.OK,
      message: 'Deposito restaurado con exito',
      data: deposito
    };
  }
}
