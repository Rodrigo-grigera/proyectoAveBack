import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/create-auth.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ResponseLoginDto } from './dto/responsLoginDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly UsuarioService: UsuarioService,
    private readonly jwtService: JwtService ) {}

  async login(body: LoginDto): Promise<ResponseLoginDto> {
    const user = await this.UsuarioService.findByEmail(body.email);
    if (!user) throw new Error('Usuario no encontrado');

    const passwordValid = await bcrypt.compare(body.password, user.password);
    if (!passwordValid) throw new Error('Contraseña incorrecta');

    const payload = { email: user.email, id: user.id };
    const token =  await  this.jwtService.signAsync(payload);
    return {
      message: 'Login exitoso',
      token: token
    };
  }


}
