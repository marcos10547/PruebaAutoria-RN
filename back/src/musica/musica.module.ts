import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Musica } from '../entities/musica.entity';
import { Categoria } from '../entities/categoria.entity';
import { MusicaService } from './musica.service';
import { MusicaController } from './musica.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Musica, Categoria])],
  providers: [MusicaService],
  controllers: [MusicaController],
  exports: [MusicaService],
})
export class MusicaModule {}
