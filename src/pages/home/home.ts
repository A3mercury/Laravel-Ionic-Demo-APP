import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TasksPage} from "../tasks/tasks.page";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController) {

    }

    goToTasks() {
        this.navCtrl.push(TasksPage);
    }
}
