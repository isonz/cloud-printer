import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CpPrint} from '../data/entities/CpPrint';
import {CpChecklist} from '../data/entities/CpChecklist';
import {CpLocations} from '../data/entities/CpLocations';

@Injectable()
export class AppService {

    constructor(
        @InjectRepository(CpPrint)
        private readonly cpPrintRepository: Repository<CpPrint>,

        @InjectRepository(CpChecklist)
        private readonly cpChecklistRepository: Repository<CpChecklist>,

        @InjectRepository(CpLocations)
        private readonly cpLocationsRepository: Repository<CpLocations>,
    ) {
    }

    async findOnePrintByStatus(status: number): Promise<any> {
         const print = await this.cpPrintRepository.findOne({status});
         if (null === print) { return null; }
         const location = await this.cpLocationsRepository.findOne(print.locationId);
         return {print, location};
    }

    async findOneChecklistById(id: number): Promise<CpChecklist> {
        return await this.cpChecklistRepository.findOne(id);
    }

    async setPrintStatus(id: number): Promise<CpPrint> {
        const print = await this.cpPrintRepository.findOne(id);
        print.status = 1;
        return await this.cpPrintRepository.save(print);
    }
}
