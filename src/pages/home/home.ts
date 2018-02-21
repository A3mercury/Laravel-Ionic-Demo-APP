import {Component} from '@angular/core';
import {NavController} from "ionic-angular";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    tasks: Array<any> = [];

    constructor(
        public navCtrl: NavController,
    ) {
        //
    }
}
