import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Musica } from '../entities/musica.entity';

@Injectable()
export class MusicaService {
  constructor(
    @InjectRepository(Musica)
    private readonly musicaRepository: Repository<Musica>,
  ) {}

  async findAll(): Promise<Musica[]> {
    return this.musicaRepository.find({ relations: ['categoria'] });
  }

  async findByCategory(categoryId: number): Promise<Musica[]> {
    return this.musicaRepository.find({
      where: { categoria: { id: categoryId } },
      relations: ['categoria'],
    });
  }
}
