import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Categoria } from './categoria.entity';
  
  @Entity('musica')
  export class Musica {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    titulo: string;
  
    @Column({ type: 'text', nullable: true })
    descripcion: string;
  
    @Column({ length: 255, nullable: true })
    imagen_url: string;

    @ManyToOne(() => Categoria, (categoria) => categoria.musicas)
    @JoinColumn({ name: 'categoria_id' })
    categoria: Categoria;
  }
  