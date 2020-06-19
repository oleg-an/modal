import { EventEmitter } from '@angular/core';

export class BaseModal<T> {
	data?: T;
	$approved = new EventEmitter<any>();
	$closed = new EventEmitter();

	close() {
		this.$closed.next();
	}

	approve(params: any = null) {
		this.$approved.next(params);
	}
}
