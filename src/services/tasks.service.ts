import {Injectable} from "@angular/core";
import {BaseHttpService} from "./base-http.service";
import {Http} from "@angular/http";

import {EnvironmentConstants} from "../constants/environment.constants";

import 'rxjs/add/operator/map';

@Injectable()
export class TasksService extends BaseHttpService {

    constructor(private http: Http) {
        super();
    }

    index(): Promise<any> {
        return this.http.get(EnvironmentConstants.api + 'tasks')
            .map(this.parseResponse)
            .toPromise();
    }

    show(id: number): Promise<any> {
        return this.http.get(EnvironmentConstants.api + 'task/' + id)
            .map(this.parseResponse)
            .toPromise();
    }
}