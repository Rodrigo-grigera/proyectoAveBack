import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProductoModule } from './producto/producto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto/entities/producto.entity';
import { StockModule } from './stock/stock.module';
import { Stock } from './stock/entities/stock.entity';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      entities: [Producto, Stock],
    })
    , ProductoModule, StockModule],
})
export class AppModule { }
