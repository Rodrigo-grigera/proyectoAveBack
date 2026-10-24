import { Stock } from "src/stock/entities/stock.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity('depositos')
export class Deposito {
  @PrimaryGeneratedColumn()
  id_deposito!: number;

  @Column({ length: 100 })
  nombre!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  direccion?: string;

  @OneToMany(() => Stock, (stock) => stock.deposito)
  conteo_stock!: Stock[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
