import { Component } from '@angular/core';
import { BaseModal } from '../../modal/base-modal';
import { InfoModelParamsModel } from '../../models';

@Component({
    selector: 'simple-modal-example',
    template: `
        Amount: {{data?.amount}} <br>
        You can close this modal by ESC or close button<br>

        <button (click)="close()" style="margin-top: 10px">
            Close
        </button>
        <button (click)="approve()">
            Approve
        </button>`
})
export class SimpleModalExampleComponent extends BaseModal<InfoModelParamsModel> {
}
