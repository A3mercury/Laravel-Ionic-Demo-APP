#### home.html
```
<ion-list>
    <ion-item *ngFor="let task of tasks">
        <ion-label>{{ task.label }}</ion-label>
        <ion-checkbox color="dark"></ion-checkbox>
    </ion-item>
</ion-list>
```

#### home.ts
```
tasks: Array<any> = [
    {
        label: 'Do some stuff'
    },
    {
        label: 'Do some other stuff'
    },
    {
        label: 'Do some things'
    }
];
```

#### tasks.service.ts
```
get(): Promise<any> {
    return this.http.get(EnvironmentConstants.api + '/tasks')
        .map(this.parseResponse)
        .toPromise();
}
``` 

#### home.ts
```
constructor(
    public navCtrl: NavController,
    private tasksSvc: TasksService
) {
    this.getTasks();
}

private getTasks() {
    this.tasksSvc.get()
        .then((res) => {
            this.tasks = res.tasks.map((t) => {
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
```

#### home.html
```
<ion-buttons end>
    <button ion-button icon-only (click)="addTask()">
        <ion-icon name="add"></ion-icon>
    </button>
</ion-buttons>
    
...
    
<ion-checkbox color="dark" (ionChange)="complete(task)" [ngModel]="task.completed"></ion-checkbox>
```

#### tasks.service.ts
```
create(payload: {label: string}) {
    this.http.post(EnvironmentConstants.api + '/tasks/create', payload)
        .map(this.parseResponse)
        .toPromise();
}

complete(payload: {task_id: number}) {
    this.http.post(EnvironmentConstants.api + '/tasks/complete', payload)
        .map(this.parseResponse)
        .toPromise();
}
```

#### home.ts
```
constructor(
    public navCtrl: NavController,
    private tasksSvc: TasksService,
    private alertCtrl: AlertController
) {
    this.getTasks();
}

...

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
                    this.tasksSvc.create({label: data.label})
                        .then((res) => {
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
    this.tasksSvc.complete()
    .then((res) => {
        console.log(res);
        
        setTimeout(() => {
            this.getTasks();
        }, 500);
    })
    .catch((err) => {
        console.log(err);
    });
}
```
