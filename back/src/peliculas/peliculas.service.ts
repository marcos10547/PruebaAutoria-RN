// peliculas.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pelicula } from '../entities/pelicula.entity';

@Injectable()
export class PeliculasService {
  constructor(
    @InjectRepository(Pelicula)
    private readonly peliculasRepository: Repository<Pelicula>,
  ) {}

  async findAll(): Promise<Pelicula[]> {
    return this.peliculasRepository.find();
  }
}
