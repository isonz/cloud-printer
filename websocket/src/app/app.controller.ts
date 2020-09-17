import {Body, Controller, Get, Post} from '@nestjs/common';
import {HttpEnum} from '../common/enums/http.enum';
import {AppService} from './app.service';

@Controller()
export class AppController {

  constructor(
      private readonly appService: AppService,
  ) {}

  @Get('')
  async index(@Body() params): Promise<HttpEnum> {
    return HttpEnum.SUCCESS();
  }

}
