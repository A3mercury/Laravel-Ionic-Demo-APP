import { Response } from '@angular/http';

import 'rxjs/add/operator/map';

export class BaseHttpService {

    protected parseResponse(response) {
        try {
            return response.json();
        } catch (e) {
            return Promise.reject(response);
        }
    }

    protected handleError(response): Promise<{ body: any, response: any }> {
        let error = {
            body: {},
            response: response
        };
        if (response && response instanceof Response) {
            console.log('BaseHttp - HTTP Response Error:', response);
            try {
                error.body = response.json() || {}
            } catch(e) {}
        } else if (response && response instanceof Error) {
            console.log('BaseHttp - Error Object:', response);
            error.body = response.toString();
        } else if (response) {
            console.log('BaseHttp - Unknown Error:', response);
            try {
                error.body = JSON.stringify(response);
            } catch(e) {}
        }
        return Promise.reject(error);
    }
}
