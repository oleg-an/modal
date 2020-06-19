import { Type } from '@angular/core';
import { BaseModal } from '../base-modal';

export interface LcgModalConfigModel<T> {
	component: Type<BaseModal<T>>,
	title: string;
	data?: T;
	maxWidth?: number;
}
