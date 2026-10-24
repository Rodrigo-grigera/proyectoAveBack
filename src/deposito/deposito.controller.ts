import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DepositoService } from './deposito.service';
import { DepositoDto } from './dto/create-deposito.dto';
import { UpdateDepositoDto } from './dto/update-deposito.dto';

@Controller('deposito')
export class DepositoController {
  constructor(private readonly depositoService: DepositoService) {}

  @Post()
  create(@Body() createDepositoDto: DepositoDto) {
    return this.depositoService.create(createDepositoDto);
  }

  @Get()
  findAll() {
    return this.depositoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.depositoService.findOne(+id);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepositoDto: UpdateDepositoDto) {
    return this.depositoService.update(+id, updateDepositoDto);
  }
  
    @Patch('restore/:id')
    restore(@Param('id') id: string) {
      return this.depositoService.restore(+id);
    }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.depositoService.remove(+id);
  }
}
