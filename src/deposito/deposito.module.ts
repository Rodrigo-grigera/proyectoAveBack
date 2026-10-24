import { Module } from '@nestjs/common';
import { DepositoService } from './deposito.service';
import { DepositoController } from './deposito.controller';
import { Deposito } from './entities/deposito.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';

@Module({
  imports: [TypeOrmModule.forFeature([Deposito])],
  controllers: [DepositoController],
  providers: [DepositoService],
  exports: [DepositoService, TypeOrmModule],
})
export class DepositoModule {}
