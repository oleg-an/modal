import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	LcgModalWrapperComponent,
} from './components';

const components = [
	LcgModalWrapperComponent
];

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [...components],
	exports: components,
	entryComponents: components
})
export class LcgModalModule {
	static forRoot(): ModuleWithProviders<LcgModalModule> {
		return {
			ngModule: LcgModalModule
		};
	}
}
