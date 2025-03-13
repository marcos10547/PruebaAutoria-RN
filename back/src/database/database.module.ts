import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
      ConfigModule, // Importamos el ConfigModule para leer las variables de entorno, Clase 
      // Estática que permite acceder a las variables de entorno
      TypeOrmModule.forRootAsync({
        inject: [ConfigService], // Inyectamos ConfigService para acceder a las variables del archivo env
        // Factory, inyectamos ConfgService ... 
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get<string>('config.postgres.host'),
          port: configService.get<number>('config.postgres.port'),
          username: configService.get<string>('config.postgres.user'),
          password: configService.get<string>('config.postgres.password'),
          database: configService.get<string>('config.postgres.dbName'),
          ssl: { rejectUnauthorized: false }, // Acepta certificados autofirmados
          autoLoadEntities: true,
          synchronize: true, // ⚠️ Solo para desarrollo
        }),
      }),
    ],
})
export class DatabaseModule {}
