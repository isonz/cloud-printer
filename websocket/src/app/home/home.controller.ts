import {Controller, Get, Param, ParseIntPipe} from '@nestjs/common';
import {HomeService} from './home.service';
import {HttpEnum} from '../../common/enums/http.enum';
import {CpPrint} from '../../data/entities/CpPrint';
import { ControllerService } from '../../common/services/controller.service';

@Controller('home')
export class HomeController extends ControllerService<CpPrint> {
    constructor(
        private readonly homeService: HomeService,
    ) {
        super(homeService);
    }

    @Get('')
    async index(): Promise<HttpEnum> {
        return HttpEnum.SUCCESS('这是首页');
    }

    @Get('getAll')
    async getAll(
        @Param('index') index: string = '1',
        @Param('size') size: string = '10',
    ): Promise<HttpEnum> {
        const pageIndex = parseInt(index, 10);
        const pageSize = parseInt(size, 10);
        const list = await this.findAll(pageIndex, pageSize, 'status=0');
        return HttpEnum.SUCCESS(list);
    }
}
