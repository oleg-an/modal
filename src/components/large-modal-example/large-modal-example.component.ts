import { Component } from '@angular/core';
import { BaseModal } from '../../modal/base-modal';
import { InfoModelParamsModel } from '../../models';

@Component({
    selector: 'large-modal-example',
    templateUrl: 'large-modal-example.component.html',
    styleUrls: ['large-modal-example.component.less']
})
export class LargeModalExampleComponent extends BaseModal<InfoModelParamsModel> {
}
