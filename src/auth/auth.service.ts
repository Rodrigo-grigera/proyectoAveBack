import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
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
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    const passwordValid = await bcrypt.compare(body.password, user.password);
    if (!passwordValid) throw new UnauthorizedException('Credenciales incorrectas');

    const payload = { 
      sub: user.id,
      email: user.email
    };
    const token =  await  this.jwtService.signAsync(payload);
    
    return {
      code: HttpStatus.OK,
      message: 'Bienvenido',
      token: token,
      user: payload
    };
  }


}
