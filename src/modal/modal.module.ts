import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalWrapperComponent, } from './components';

const components = [
	ModalWrapperComponent
];

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [...components],
    exports: components,
    entryComponents: components
})
export class ModalModule {
}
