import { Component } from '@angular/core';
import { InfoModelParamsModel } from "../../models";
import { BaseModal } from "../../modal/base-modal";

@Component({
    selector: 'simple-modal-example',
    templateUrl: 'simple-modal-example.component.html',
    styleUrls: ['simple-modal-example.component.less']
})
export class SimpleModalExampleComponent extends BaseModal<InfoModelParamsModel> {
}
