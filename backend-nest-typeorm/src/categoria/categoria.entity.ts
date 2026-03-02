import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { productos } from '../productos/productos.entity';

@Entity('categoria')
export class categoria {
  @PrimaryGeneratedColumn({ name: 'id_categoria' })
  id_categoria: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100, unique: true })
  nombre: string;

  @Column({ name: 'descripcion', length: 100 })
  descripcion: string;

  @OneToMany(() => productos, (c) => c.categoria)
  producto: productos[];
}
