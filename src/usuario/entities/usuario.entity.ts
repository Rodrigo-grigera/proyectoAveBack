import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuarios')
export class Usuario {

    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({unique: true, length: 150 })
    email!: string;

    @Column({length: 150, select: false })
    password!: string;

    @DeleteDateColumn()
    deletedAt!: Date;
}
