import { Module } from '@nestjs/common';
import { AppController } from './modules/app.controller';
import { AppService } from './modules/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CitiesModule } from './modules/cities/cities.module';
import { UsersModule } from './modules/users/users.module';
import { join } from 'path';

@Module({
  imports: [
    // With this, we can use .env file
    ConfigModule.forRoot({
      isGlobal: true, // Makes this module global
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Here, we are using variables coming from docker-compose
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [join(process.cwd()), 'dist/**/*.entity.js'],
      synchronize: true, // Should be FALSE in PROD
      autoLoadEntities: true,
    }),
    CitiesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
