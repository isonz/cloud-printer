import { Injectable } from '@nestjs/common';
import {News} from '../data/entities/News';
import {RepositoryService} from '../common/services/repository.service';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class AppService extends RepositoryService<News> {

    constructor(
        @InjectRepository(News)
        private readonly usersRepository: Repository<News>,
    ) {
        super(usersRepository);
    }

}
