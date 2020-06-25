import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSimpleExampleComponent } from './test-simple-example/test-simple-example.component';
import { TestModalParamsModel } from './models';
import { ModalWrapperComponent } from '../modal/components';
import { Modal } from '../modal/services';
import { BaseModal } from '../modal/base-modal';
import { ModalModule } from '../modal';

describe('modal tests', () => {
    let fixture: ComponentFixture<ModalWrapperComponent<TestModalParamsModel>>;
    let component: ModalWrapperComponent<TestModalParamsModel>;
    let service: Modal;
    let modal: BaseModal<TestModalParamsModel>;
    let el: HTMLElement;

    const openModal = (amount: number = 0) => service.open<TestModalParamsModel>({
        title: 'the title',
        component: TestSimpleExampleComponent,
        data: {amount}
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                ModalModule
            ],
            declarations: [
                TestSimpleExampleComponent
            ]
        }).compileComponents();

        service = TestBed.inject(Modal);
        modal = openModal();

        fixture = TestBed.createComponent(ModalWrapperComponent) as ComponentFixture<ModalWrapperComponent<TestModalParamsModel>>;
        component = fixture.componentInstance;
        component.contentComponent = TestBed.createComponent(TestSimpleExampleComponent).componentRef;

        el = fixture.debugElement.nativeElement;
    });

    it('should create instance', () => {
        expect(component).toBeDefined();
        expect(el.querySelector('#dialogDesc')).toBeTruthy();

        const d = service.document;

        expect(d.querySelector('modal-wrapper')).toBeTruthy();
        expect(d.querySelector('test-simple-example')).toBeTruthy();

        const overlay = d.querySelector('.modal__overlay');

        expect(overlay.getAttribute('role')).toBe('dialog');
        expect(overlay.getAttribute('aria-labelledby')).toBe('dialogTitle');
        expect(overlay.getAttribute('aria-describedby')).toBe('dialogDesc');
    });

    it('should multiple modals with single overlay', (() => {
        openModal();
        openModal();

        const modalsCount = 3;
        const overlays: HTMLElement[] = Array.from(service.document.querySelectorAll('.modal--hideOverlay'));
        const isSingleOverlayAlwaysShow = overlays.length === modalsCount - 1;

        expect(isSingleOverlayAlwaysShow).toEqual(true);
    }));

    it('should modal close event fire', () => {
        const spy = spyOn(modal.$closed, 'next');
        modal.close();
        expect(spy.calls.any()).toBe(true, 'BaseModal.$closed.next called');
    });

    it('should modal approve event fire', () => {
        const spy = spyOn(modal.$approved, 'next');

        const data = {productType: 'short'};

        modal.approve(data);
        const arg = spy.calls.first().args[0];
        expect(arg).toEqual(data);
    });

    it('should modal title assignment', () => {
        const title = 'the title';

        expect(component.title).toBeFalsy();
        component.title = title;

        fixture.detectChanges();
        expect(component.title).toBe(title);

        expect(el.querySelector('#dialogTitle').textContent).toBe(title);
    });
});
