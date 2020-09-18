import { SubscribeMessage, WebSocketGateway, WsResponse, WebSocketServer } from '@nestjs/websockets';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {AppService} from './app.service';
import {CpPrint} from '../data/entities/CpPrint';
import {CpChecklist} from '../data/entities/CpChecklist';

@WebSocketGateway()
export class EventsGateway {

    constructor(
        private readonly appService: AppService,
    ) {
    }
    @WebSocketServer() server;

    @SubscribeMessage('queryPrint')
    async onQueryPrint(client: any, payload: any): Promise<Observable<WsResponse<any>> | any> {
        const { name } = payload;
        if (name === 'listenStatus') {
            return of({
                event: 'eventListenPrintStatus',
                data: await this.getPrint(),
            });
        }
        /*
        if (name === 'alone') {
            return of('hi', '实打实').pipe(map($_ => ({
                event: 'events', data: { msg: $_},
            })));
        }
        */
        return of(payload);
    }

    @SubscribeMessage('queryChecklist')
    async onQueryChecklist(client: any, payload: any): Promise<Observable<WsResponse<any>> | any> {
        const { name } = payload;
        const { id } = payload;
        // console.log(payload);
        if (name === 'listenId') {
            return of({
                event: 'eventListenChecklistId',
                data: await this.getChecklist(id),
            });
        }
        return of(payload);
    }

    @SubscribeMessage('setPrintStatus')
    async onSetPrintStatus(client: any, payload: any): Promise<Observable<WsResponse<any>> | any> {
        const { name } = payload;
        const { id } = payload;
        // console.log(payload);
        if (name === 'setStatus') {
            return of({
                event: 'eventSetPrintStatus',
                data: await this.setPrintStatus(id),
            });
        }
        return of(payload);
    }

    async getPrint(): Promise<CpPrint> {
        return await this.appService.findOnePrintByStatus(0);
    }

    async getChecklist(id: number): Promise<CpChecklist> {
        return await this.appService.findOneChecklistById(id);
    }

    async setPrintStatus(id: number): Promise<CpPrint> {
        return await this.appService.setPrintStatus(id);
    }
}
