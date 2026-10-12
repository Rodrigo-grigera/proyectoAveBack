import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { Stock } from './entities/stock.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from 'src/producto/entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stock, Producto])],
  controllers: [StockController],
  providers: [StockService],
  exports: [TypeOrmModule, StockService]
})
export class StockModule {}
