import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ModalModule } from "../modal";
import { SimpleModalExampleComponent } from "../components";

@NgModule({
    declarations: [
        SimpleModalExampleComponent,
        AppComponent
    ],
    imports: [
        ModalModule,
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}
