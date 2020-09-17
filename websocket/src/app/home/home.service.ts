import { Injectable } from '@nestjs/common';
import {RepositoryService} from '../../common/services/repository.service';
import {CpPrint} from '../../data/entities/CpPrint';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class HomeService extends RepositoryService<CpPrint> {

    constructor(
        @InjectRepository(CpPrint)
        private readonly homeRepository: Repository<CpPrint>,
    ) {
        super(homeRepository);
    }
}
