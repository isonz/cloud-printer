import {Controller, Get} from '@nestjs/common';
import {HomeService} from './home.service';
import {HttpEnum} from '../../common/enums/http.enum';

@Controller('home')
export class HomeController {
    constructor(
        private readonly homeService: HomeService,
    ) {}

    @Get('')
    async index(): Promise<HttpEnum> {
        return HttpEnum.SUCCESS('这是首页');
    }

}
