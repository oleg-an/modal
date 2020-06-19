import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Inject,
    Injectable,
    Injector
} from '@angular/core';
import { ModalWrapperComponent } from '../components';
import { LcgModalConfigModel } from '../models';
import { BaseModal } from '../base-modal';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class Modal {
    private modals: Array<ComponentRef<any>> = [];
    private _document?: HTMLDocument;

    constructor(
        @Inject(DOCUMENT) public document: HTMLDocument,
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector) {
        this._document = document as HTMLDocument;
    }

    open<T>(params: LcgModalConfigModel<T>): BaseModal<T> {
        const modalBody = this.getModalBody(params.component);
        const modal = this.getModal<T>(params.title, modalBody, params.maxWidth);
        modalBody.instance.data = params.data;

        modal.changeDetectorRef.detectChanges();
        return modal.instance
    }

    private getModal<T>(title: string, bodyComponent, maxWidth = null): ComponentRef<ModalWrapperComponent<T>> {
        const wrapper = this.componentFactoryResolver
            .resolveComponentFactory<ModalWrapperComponent<T>>(ModalWrapperComponent)
            .create(this.injector);

        wrapper.instance.title = title;
        wrapper.instance.maxWidth = maxWidth;
        wrapper.instance.contentComponent = bodyComponent;
        wrapper.instance.$closed.subscribe(_ => {
            this.destroyOpenModal();
        });

        this.disableBackgroundLastModal();
        this.modals.push(wrapper);

        this.appRef.attachView(wrapper.hostView);

        const domElem = (wrapper.hostView as EmbeddedViewRef<any>)
            .rootNodes[0] as HTMLElement;

        this._document.body.appendChild(domElem);
        if (this.modals.length === 1) {
            this._document.body.classList.add('modal--open');
        }
        this._document.onkeydown = (evt) => {
            if (evt.key === 'Escape') {
                const lastModal = this.modals[this.modals.length - 1];
                if (lastModal) {
                    lastModal.instance.close();
                }
            }
        };
        return wrapper;
    }

    private getModalBody(component): ComponentRef<any> {
        return this.componentFactoryResolver
            .resolveComponentFactory(component)
            .create(this.injector);
    }

    private disableBackgroundLastModal() {
        const lastModal = this.modals[this.modals.length - 1];

        if (lastModal) {
            lastModal.instance.overlay.nativeElement.classList.add('modal--hideOverlay');
        }
    }

    private enableBackgroundLastModal() {
        const lastModal = this.modals[this.modals.length - 1];

        if (lastModal) {
            lastModal.instance.overlay.nativeElement.classList.remove('modal--hideOverlay')
        }
    }

    private destroyOpenModal() {
        const lastModal = this.modals.pop();

        if (lastModal) {
            this.enableBackgroundLastModal();
            lastModal.destroy();
        }

        if (!this.modals.length) {
            this._document.body.classList.remove('modal--open');
        }
    }
}
