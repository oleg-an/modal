import { Component } from '@angular/core';
import { SimpleModalExampleComponent } from '../components';
import { Modal } from '../modal/modal.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    constructor(private modal: Modal) {
    }

    openModal() {
        this.modal.open({
            title: 'Some title',
            component: SimpleModalExampleComponent
        });
    }
}





