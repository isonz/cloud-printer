import {HttpModule, Module} from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environment';
import { getMetadataArgsStorage } from 'typeorm';
import { HomeModule } from './home/home.module';
import {APP_GUARD} from '@nestjs/core';
import {AuthGuard} from './auth.guard';
import {News} from '../data/entities/News';

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
    TypeOrmModule.forFeature([News]),

    HomeModule,
  ],
  controllers: [AppController],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },

    AppService,
  ],
})
export class AppModule {

}
