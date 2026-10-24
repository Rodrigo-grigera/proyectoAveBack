import { Deposito } from 'src/deposito/entities/deposito.entity';
import { Producto } from 'src/producto/entities/producto.entity';
import {Column,CreateDateColumn,Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn, Unique, UpdateDateColumn} from 'typeorm';

@Entity('stock')
@Unique(['id_producto', 'fecha_vencimiento', 'id_deposito'])

export class Stock {
  @PrimaryGeneratedColumn()
  id_stock!: number;

  @Column()
  id_producto!: number;

  @Column()
  id_deposito!: number;

  @Column({ type: 'date' })
  fecha_vencimiento!: string;

  @Column({ type: 'int', default: 0 })
  cantidad_bulto!: number;

  @Column({ type: 'int', default: 0 })
  cantidad_unidades!: number;

  @ManyToOne(() => Producto, (producto) => producto.conteo_stock, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'id_producto' })
  producto!: Producto;

  @ManyToOne(() => Deposito, (deposito) => deposito.conteo_stock, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'id_deposito' })
  deposito!: Deposito;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}