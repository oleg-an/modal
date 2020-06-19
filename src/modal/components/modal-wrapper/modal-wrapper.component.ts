import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ComponentRef,
    ElementRef,
    Inject,
    OnDestroy,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { BaseModal } from '../../base-modal';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

/** @dynamic */
@Component({
    selector: 'modal-wrapper',
    styleUrls: ['./modal-wrapper.component.less'],
    templateUrl: './modal-wrapper.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalWrapperComponent<T> extends BaseModal<T> implements AfterViewInit, OnDestroy {
    contentComponent: ComponentRef<any>;
    maxWidth?: number;
    title?: string;
    @ViewChild('overlay', {static: true}) overlay: ElementRef<HTMLElement>;
    @ViewChild('vf', {read: ViewContainerRef, static: true}) private vf: ViewContainerRef;
    @ViewChild('contentRef', {static: true}) private contentRef: ElementRef<HTMLElement>;
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(@Inject(DOCUMENT) public document: HTMLDocument) {
        super();
    }

    ngAfterViewInit() {
        if (!(this.contentComponent.instance instanceof BaseModal)) {
            throw new Error('The content component must be inherited from BaseModal');
        }

        this.subscribeToContentEvent();
        this.assignModalWidth();
        this.vf.insert(this.contentComponent.hostView);
        this.contentComponent.changeDetectorRef.detectChanges();

        const overlayHeight = this.overlay.nativeElement.offsetHeight;
        const contentHeight = this.contentRef.nativeElement.offsetHeight;

        if (contentHeight < overlayHeight) {
            this.contentRef.nativeElement.style.marginTop = (overlayHeight * 0.3 - contentHeight / 2) + 'px';
        }
    }

	private assignModalWidth() {
		if (!this.maxWidth) {
            this.contentRef.nativeElement.classList.add('modal--width');
            return;
        }
		this.contentRef.nativeElement.style.maxWidth = this.maxWidth + 'px';
	}

	private subscribeToContentEvent() {
		this.contentComponent.instance
			.$closed
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe(x => {
				this.$closed.next(x);
			});

		this.contentComponent.instance
			.$approved
			.pipe(takeUntil(this.ngUnsubscribe))
			.subscribe(x => {
				this.$approved.next(x);
			});
	}

	ngOnDestroy(): void {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
		this.contentComponent.destroy();
	}
}
