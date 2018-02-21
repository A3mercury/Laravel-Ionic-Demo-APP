import {Injectable} from "@angular/core";
import {BaseHttpService} from "./base-http.service";
import {Http} from "@angular/http";

@Injectable()
export class TasksService extends BaseHttpService {

    constructor(private http: Http) {
        super();
    }
}
