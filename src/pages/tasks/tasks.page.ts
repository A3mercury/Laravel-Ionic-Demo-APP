import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {TaskItemsPage} from "../task-items/task-items.page";
import {TasksService} from "../../services/tasks.service";

@Component({
    selector: 'tasks-page',
    templateUrl: 'tasks.page.html'
})
export class TasksPage {

    tasks: Array<any> = [];

    constructor(
        private navCtrl: NavController,
        private taskSvc: TasksService
    ) {
        this.getTasks();
    }

    private getTasks() {
        this.taskSvc.index()
            .then((response) => {
                this.tasks = response.tasks;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    goToTaskItems(task) {
        this.navCtrl.push(TaskItemsPage, {
            task: task
        });
    }
}
