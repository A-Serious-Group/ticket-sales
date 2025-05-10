import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seeds/event.seed';
import { AppController } from './app.controller';
import { EventModule } from './events/event.module';
import { Event } from './events/entities/event.entity';
import { TicketModule } from './tickets/ticket.module';
import { Ticket } from './tickets/entities/ticket.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),  
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Event, Ticket],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Event, Ticket]),
    EventModule,
    TicketModule,
    CloudinaryModule
  ],
  controllers: [AppController],
  providers: [AppService, SeedService]
})
export class AppModule {}
