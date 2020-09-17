import { Module } from '@nestjs/common';
import { HomeController } from './home.controller';
import { HomeService } from './home.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CpPrint} from '../../data/entities/CpPrint';

@Module({
  imports: [TypeOrmModule.forFeature([CpPrint])],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
