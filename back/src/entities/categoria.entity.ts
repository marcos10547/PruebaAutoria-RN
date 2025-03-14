import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Musica } from './musica.entity';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @OneToMany(() => Musica, (musica) => musica.categoria)
  musicas: Musica[];
}
