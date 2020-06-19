import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LargeModalExampleComponent, SimpleModalExampleComponent } from '../components';
import { ModalModule } from '../modal';

@NgModule({
    declarations: [
        SimpleModalExampleComponent,
        LargeModalExampleComponent,
        AppComponent
    ],
    imports: [
        ModalModule,
        BrowserModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
