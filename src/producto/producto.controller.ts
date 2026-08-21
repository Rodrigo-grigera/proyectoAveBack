import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

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

  @Get('categoria/:id')
  findByCategoria(@Param('id', ParseIntPipe) id_categoria: number,
  ) {
    return this.productoService.findProdCategory(id_categoria);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() Producto: UpdateProductoDto) {
    return this.productoService.update(+id, Producto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productoService.remove(+id);
  }
}
