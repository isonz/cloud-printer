import {Injectable, CanActivate, ExecutionContext, HttpService} from '@nestjs/common';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {Logger} from '../common/utils/log4js';

@Injectable()
export class AuthGuard implements CanActivate {

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    constructor(private httpService: HttpService) {}

    async validateRequest(request: Request) : Promise<boolean> {
        // console.log(request.headers);
        if(!request || !request.headers) return false;
        let authorization: string = request.headers["authorization"];
        let myHost: string = request.headers["host"];
        if(!authorization || authorization.length < 32) return false;

        const headersRequest = {
            'Content-Type': 'application/json; charset=utf-8', // afaik this one is not needed
            'Authorization': authorization,
        };

        try {
            const obs = await this.httpService.post(environment.authGuardUrl, {host: myHost}, {headers:headersRequest}).toPromise();
            if(null === obs) return false;
            console.log(obs.data);
            if('undefined' === typeof obs.data) return false;
            if('undefined' === typeof obs.data.code) return false;
            return 0 === obs.data.code;
        } catch (e) {
            Logger.error('AuthGuard validateRequest httpService Error:'+ e.toString() +' post url:' + environment.authGuardUrl + ', myHost:'+  myHost + ', headers:');
            //throw e;
        }
        return false;
    }

}
