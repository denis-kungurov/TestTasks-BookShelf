import { createAction } from 'redux-actions';

export const createAppAction = createAction as unknown as <
	A extends { type: string; payload: unknown } | { type: string },
	R = A extends { type: string; payload: unknown }
		? (payload: A['payload']) => A
		: () => A,
>(
	type: A['type'],
) => R;
