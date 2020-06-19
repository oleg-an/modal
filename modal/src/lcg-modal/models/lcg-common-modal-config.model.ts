import { Type } from '@angular/core';
import { LcgBaseModal } from '../lcg-base-modal';

export interface LcgCommonModalConfigModel<T> {
	component: Type<LcgBaseModal<T>>,
	title: string;
	data?: T;
	maxWidth?: number;
}
