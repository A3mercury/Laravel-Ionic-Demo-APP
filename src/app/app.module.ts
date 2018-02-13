import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {TasksPage} from "../pages/tasks/tasks.page";
import {TaskItemsPage} from "../pages/task-items/task-items.page";
import {TasksService} from "../services/tasks.service";

import {HttpModule} from '@angular/http';
import {TaskItemsService} from "../services/task-items.service";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        TasksPage,
        TaskItemsPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        TasksPage,
        TaskItemsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        TasksService,
        TaskItemsService,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
