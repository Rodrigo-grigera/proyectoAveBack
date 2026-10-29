import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { JwtAuthGuard } from 'src/auth/authGuard';

@UseGuards(JwtAuthGuard)
@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) { }

  @Post()
  create(@Body() Producto: ProductoDto) {
    return this.productoService.create(Producto);
  }

  @Get()
  findAll() {
    return this.productoService.findAll();
  }
  
  @Get('nombre/:nombre')
  getNombre(@Param('nombre') nombre: string) {
    return this.productoService.getNombre(nombre);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() Producto: UpdateProductoDto) {
    return this.productoService.update(+id, Producto);
  }

  @Patch('restore/:id')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.productoService.restore(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoService.remove(+id);
  }
}
