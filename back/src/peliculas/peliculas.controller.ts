// peliculas.controller.ts
import { Controller, Get } from '@nestjs/common';
import { PeliculasService } from './peliculas.service';
import { Pelicula } from '../entities/pelicula.entity';

@Controller('peliculas')
export class PeliculasController {
  constructor(private readonly peliculasService: PeliculasService) {}

  @Get()
  async listarTodas(): Promise<Pelicula[]> {
    return this.peliculasService.findAll();
  }
}
