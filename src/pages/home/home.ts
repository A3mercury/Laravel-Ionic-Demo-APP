import {Component} from '@angular/core';
import {AlertController, NavController} from "ionic-angular";
import {TasksService} from "../../services/tasks.service";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    tasks: Array<any> = [];

    constructor(
        public navCtrl: NavController,
        private tasksSvc: TasksService,
        public alertCtrl: AlertController
    ) {
        this.getTasks();
    }

    getTasks() {
        this.tasksSvc.get()
            .then((response) => {
                this.tasks = response.tasks.map((t) => {
                    return {
                        id: t.id,
                        label: t.label,
                        completed: t.completed != null
                    };
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    addTask() {
        let prompt = this.alertCtrl.create({
            title: 'Add New Task',
            message: 'Enter a label from your new task.',
            inputs: [
                {
                    name: 'label',
                    placeholder: 'Label'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('cancelled');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        this.tasksSvc.create({
                            label: data.label
                        })
                            .then((response) => {
                                this.getTasks();
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

    complete(task) {
        this.tasksSvc.complete({
            task_id: task.id
        })
            .then((r) => {
                setTimeout(() => {
                    this.getTasks();
                }, 500);
            })
            .catch((e) => {
                console.log(e);
            });
    }
}
