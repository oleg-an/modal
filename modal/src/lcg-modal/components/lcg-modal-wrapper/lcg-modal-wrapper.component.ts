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
import { LcgBaseModal } from '../../lcg-base-modal';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

/** @dynamic */
@Component({
	selector: 'lcg-modal-wrapper',
	styleUrls: ['./lcg-modal-wrapper.component.less'],
	templateUrl: './lcg-modal-wrapper.component.html',
	host: {class: 'lcg-modal'},
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LcgModalWrapperComponent<T> extends LcgBaseModal<T> implements AfterViewInit, OnDestroy {
	contentComponent: ComponentRef<any>;
	maxWidth?: number;
	title?: string;

	@ViewChild('vf', {read: ViewContainerRef, static: true}) private vf: ViewContainerRef;
	@ViewChild('contentRef', {static: true}) private contentRef: ElementRef<HTMLElement>;
	@ViewChild('overlay', {static: true}) overlay: ElementRef<HTMLElement>;
	private ngUnsubscribe: Subject<void> = new Subject<void>();

	constructor(@Inject(DOCUMENT) public document: HTMLDocument) {
		super();
	}

	ngAfterViewInit() {
		if (!(this.contentComponent.instance instanceof LcgBaseModal)) {
			throw new Error('The content component must be inherited from LcgBaseModal');
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
			this.contentRef.nativeElement.classList.add('lcg-modal--width');
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
