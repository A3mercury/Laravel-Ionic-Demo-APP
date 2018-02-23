import {Injectable} from "@angular/core";
import {BaseHttpService} from "./base-http.service";
import {Http} from "@angular/http";
import {EnvironmentConstants} from "../constants/environment.constants";

@Injectable()
export class TasksService extends BaseHttpService {

    constructor(private http: Http) {
        super();
    }

    get(): Promise<any> {
        return this.http.get(EnvironmentConstants.api + '/tasks')
            .map(this.parseResponse)
            .toPromise();
    }

    create(payload: {label: string}) {
        return this.http.post(EnvironmentConstants.api + '/tasks/create', payload)
            .map(this.parseResponse)
            .toPromise();
    }

    complete(payload: {task_id: number}) {
        return this.http.post(EnvironmentConstants.api + '/tasks/complete', payload)
            .map(this.parseResponse)
            .toPromise();
    }

}
