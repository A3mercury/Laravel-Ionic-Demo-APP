import {Component} from "@angular/core";
import {AlertController, NavParams} from "ionic-angular";
import {TasksService} from "../../services/tasks.service";
import {TaskItemsService} from "../../services/task-items.service";

@Component({
    selector: 'task-items-page',
    templateUrl: 'task-items.page.html'
})
export class TaskItemsPage {

    task: any;
    items: Array<any> = [];

    constructor(
        private navParams: NavParams,
        private taskSvc: TasksService,
        private taskItemSvc: TaskItemsService,
        private alertCtrl: AlertController
    ) {
        this.task = navParams.get('task');

        this.getTask();
    }

    getTask() {
        this.taskSvc.show(this.task.id)
            .then((response) => {
                this.items = response.items.map((item) => {
                    return {
                        id: item.id,
                        label: item.label,
                        completed: item.completed != null
                    }
                });
                console.log(this.items);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    completeItem(item) {
        this.taskItemSvc.complete({
            item_id: item.id
        })
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    addItem() {
        let prompt = this.alertCtrl.create({
            title: 'New Task Item',
            message: "Enter a label for your new task item.",
            inputs: [
                {
                    name: 'label',
                    placeholder: 'Label'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        this.taskItemSvc.store({
                            task_id: this.task.id,
                            label: data.label,
                        })
                            .then((response) => {
                                this.getTask();
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                }
            ]
        });
        prompt.present();
    }
}
