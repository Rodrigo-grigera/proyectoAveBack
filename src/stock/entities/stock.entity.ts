import { Producto } from 'src/producto/entities/producto.entity';
import {Column,CreateDateColumn,Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn, Unique} from 'typeorm';

@Entity('stock')
@Unique(['id_producto', 'fecha'])
export class Stock {

  @PrimaryGeneratedColumn()
  id_stock!: number;

  @Column()
  id_producto!: number;

  @Column({ type: 'date' })
  fecha!: string;

   @Column({ type: 'integer', default: 0 })
  cantidad_bulto!: number;

  @Column({ type: 'integer', default: 0 })
  cantidad_unidades!: number;

   @ManyToOne(() => Producto,(produ) => produ.conteo_stock,
    {nullable: false, onDelete: 'RESTRICT'})

  @JoinColumn({ name: 'id_producto' })
  producto!: Producto;

  @CreateDateColumn()
  createdAt!: Date;
}
