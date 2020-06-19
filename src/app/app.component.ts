import { Component } from '@angular/core';
import { SimpleModalExampleComponent } from '../components';
import { Modal } from '../modal/services/modal.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent {
    constructor(private modal: Modal) {
    }

    openModal() {
        const modal = this.modal.open({
            title: 'Some title',
            data: {
                amount: 1000
            },
            component: SimpleModalExampleComponent
        });

        modal.$closed.subscribe(_ => {

        });
    }
}
