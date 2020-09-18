import {HttpModule, Module} from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environment';
import { getMetadataArgsStorage } from 'typeorm';
import { HomeModule } from './home/home.module';
import {APP_GUARD} from '@nestjs/core';
import {AuthGuard} from './auth.guard';
import {EventsGateway} from './events.gateway';
import {CpPrint} from '../data/entities/CpPrint';
import {CpChecklist} from '../data/entities/CpChecklist';
import {CpLocations} from '../data/entities/CpLocations';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: environment.mysql_01.host,
      port: environment.mysql_01.port,
      username: environment.mysql_01.username,
      password: environment.mysql_01.password,
      database: environment.mysql_01.database,
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
      synchronize: false,
      logging: ['query', 'error'],
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    TypeOrmModule.forFeature([CpPrint, CpChecklist, CpLocations]),

    HomeModule,
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    EventsGateway,
    AppService,
  ],
})
export class AppModule {

}
