import {Injectable} from "@angular/core";
import {BaseHttpService} from "./base-http.service";
import {Headers, Http} from "@angular/http";
import {EnvironmentConstants} from "../constants/environment.constants";

@Injectable()
export class TaskItemsService extends BaseHttpService {

    constructor(private http: Http) {
        super();
    }

    store(payload: any) {
        return this.http.post(EnvironmentConstants.api + 'task/item/store', payload)
            .map(this.parseResponse)
            .toPromise();
    }

    complete(payload: any) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(EnvironmentConstants.api + 'task/item/complete', payload, {
            headers: headers
        })
            .map(this.parseResponse)
            .toPromise();
    }
}
