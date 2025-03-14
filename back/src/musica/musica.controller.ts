import { Controller, Get, Query } from '@nestjs/common';
import { MusicaService } from './musica.service';
import { Musica } from '../entities/musica.entity';

@Controller('musica')
export class MusicaController {
  constructor(private readonly musicaService: MusicaService) {}

  @Get()
  async listarMusica(@Query('categoria') categoria?: string): Promise<Musica[]> {
    if (categoria) {
      const categoryId = parseInt(categoria, 10);
      if (!isNaN(categoryId)) {
        return this.musicaService.findByCategory(categoryId);
      }
    }
    return this.musicaService.findAll();
  }
}
