import { Component } from '@angular/core';
import { BaseModal } from '../../modal/base-modal';
import { InfoModelParamsModel } from '../../models';

@Component({
    selector: 'simple-modal-example',
    templateUrl: 'simple-modal-example.component.html',
    styleUrls: ['simple-modal-example.component.less']
})
export class SimpleModalExampleComponent extends BaseModal<InfoModelParamsModel> {
}
