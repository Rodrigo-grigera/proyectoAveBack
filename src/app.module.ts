import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ProductoModule } from './producto/producto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './producto/entities/producto.entity';
import { StockModule } from './stock/stock.module';
import { Stock } from './stock/entities/stock.entity';
import { DepositoModule } from './deposito/deposito.module';
import { Deposito } from './deposito/entities/deposito.entity';


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
      entities: [Producto, Stock, Deposito],
    })
    , ProductoModule, StockModule, DepositoModule],
})
export class AppModule { }
