import {
  ConflictException,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async onModuleInit(): Promise<void> {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error(
        'Faltan ADMIN_EMAIL o ADMIN_PASSWORD en el entorno',
      );
    }

    if (Buffer.byteLength(password, 'utf8') > 72) {
      throw new Error(
        'La contraseña inicial no puede superar los 72 bytes para bcrypt',
      );
    }

    const existente = await this.usuarioRepository.findOne({
      where: { email },
      withDeleted: true,
    });

    if (existente) {
      if (existente.deletedAt) {
        throw new ConflictException(
          'El usuario administrador existe, pero está eliminado lógicamente',
        );
      }

      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const usuario = this.usuarioRepository.create({
      email,
      password: passwordHash,
    });

    await this.usuarioRepository.save(usuario);

    console.log(`Usuario inicial creado: ${email}`);
  }
}