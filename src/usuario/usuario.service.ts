import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { ResponseDto } from 'src/responseDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(@InjectRepository(Usuario) private readonly userRepository: Repository<Usuario>) {}

  async create(body: UsuarioDto): Promise<ResponseDto<Usuario>> {
    
    const emailExists = await this.userRepository.findOne({ where: { email: body.email }, withDeleted: true });
    if (emailExists) throw new NotFoundException(`El email ${body.email} ya se encuentra registrado`);
    
    const passwordHash = await bcrypt.hash(body.password, 10);

    const newUsuario = this.userRepository.create({ ...body, password: passwordHash });
    const savedUsuario = await this.userRepository.save(newUsuario);
    return {
      code: HttpStatus.CREATED,
      message: 'Usuario creado exitosamente',
    };
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.userRepository
      .createQueryBuilder('usuario')
      .addSelect('usuario.password')
      .where('usuario.email = :email', {
        email: email.trim().toLowerCase(),
      })
      .andWhere('usuario.deletedAt IS NULL')
      .getOne();
  }


  async findAll() : Promise<ResponseDto<Usuario>> {
    const resp = await this.userRepository.find();
    if(!resp || resp.length === 0) throw new NotFoundException('No se encontraron usuarios');
    return {
      code: HttpStatus.OK,
      message: 'Usuarios obtenidos exitosamente',
      data: resp
    };
  }

  async findOne(id: number) : Promise<ResponseDto<Usuario>> {
    const resp = await this.userRepository.findOne({ where: { id } });
    if(!resp) throw new NotFoundException('Usuario no encontrado');
    return {
      code: HttpStatus.OK,
      message: 'Usuario obtenido exitosamente',
      data: resp
    };
  }

  async update(id: number, body: UpdateUsuarioDto) : Promise<ResponseDto<Usuario>> {
    const usuario = await this.userRepository.findOne({ where: { id } });
    if(!usuario) throw new NotFoundException('Usuario no encontrado');

    Object.assign(usuario, body);
    const updatedUsuario = await this.userRepository.save(usuario);
    return {
      code: HttpStatus.OK,
      message: 'Usuario actualizado exitosamente',
      data: updatedUsuario
    };
  }

  async remove(id: number) : Promise<ResponseDto<Usuario>> {
    const usuario = await this.userRepository.findOne({ where: { id } });
    if(!usuario) throw new NotFoundException('Usuario no encontrado');
    await this.userRepository.softDelete(usuario);
    return {
      code: HttpStatus.OK,
      message: 'Usuario eliminado exitosamente',
      data: usuario
    };
  }

  async restore(id: number) : Promise<ResponseDto<Usuario>> {
    const usuario = await this.userRepository.findOne({ where: { id }, withDeleted: true });
    if(!usuario) throw new NotFoundException('Usuario no encontrado');
    await this.userRepository.restore(usuario);
    return {
      code: HttpStatus.OK,
      message: 'Usuario restaurado exitosamente',
      data: usuario
    };
  }

}

