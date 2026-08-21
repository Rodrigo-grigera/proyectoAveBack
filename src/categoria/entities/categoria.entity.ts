import { Producto } from "src/producto/entities/producto.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id_categoria!: number;

  @Column({ unique: true })
  nombre!: string;

  @OneToMany(() => Producto, producto => producto.categoria)
  productos!: Producto[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
    
}
