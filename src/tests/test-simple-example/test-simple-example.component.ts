import { Component } from '@angular/core';
import { TestModalParamsModel } from '../models';
import { BaseModal } from '../../modal/base-modal';

@Component({
	selector: 'test-simple-example',
	templateUrl: 'test-simple-example.component.html',
	styleUrls: ['test-simple-example.component.less']
})
export class TestSimpleExampleComponent extends BaseModal<TestModalParamsModel> {
}
