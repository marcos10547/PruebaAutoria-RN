// pelicula.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('peliculas')
export class Pelicula {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  titulo: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'int', nullable: true })
  anio: number;

  @Column({ length: 255, nullable: true })
  imagen_url: string;
}
