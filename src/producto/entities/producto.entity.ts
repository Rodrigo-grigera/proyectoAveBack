import { Stock } from 'src/stock/entities/stock.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id_producto!: number;

  @Column()
  nombre!: string;

  @Column()
  marca!: string;

  @Column({ nullable: true })
  descripcion!: string;

  @OneToMany(() => Stock, (conteo) => conteo.producto)
  conteo_stock!: Stock[];

  @DeleteDateColumn()
  deletedAt!: Date;
}
