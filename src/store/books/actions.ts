import { AppThunk } from 'store';

import { getBookApi, getBooksApi } from 'api/books';

import { createAppAction } from '../create-app-action';

import { getFavoriteList, getReadList } from './selectors/getters';
import {
	BOOKS_ACTIONS_TYPES,
	SetBookErrorAction,
	SetBookPendingAction,
	SetBooksErrorAction,
	SetBooksPendingAction,
	SetBooksSuccessAction,
	SetBookSuccessAction,
	SetFavoriteBooksAction,
	SetReadBooksAction,
} from './types';

export const setBooksPendingAC = createAppAction<SetBooksPendingAction>(
	BOOKS_ACTIONS_TYPES.SET_BOOKS_PENDING,
);
export const setBooksSuccessAC = createAppAction<SetBooksSuccessAction>(
	BOOKS_ACTIONS_TYPES.SET_BOOKS_SUCCESS,
);
export const setBooksErrorAC = createAppAction<SetBooksErrorAction>(
	BOOKS_ACTIONS_TYPES.SET_BOOKS_ERROR,
);

export const setBookPendingAC = createAppAction<SetBookPendingAction>(
	BOOKS_ACTIONS_TYPES.SET_BOOK_PENDING,
);
export const setBookSuccessAC = createAppAction<SetBookSuccessAction>(
	BOOKS_ACTIONS_TYPES.SET_BOOK_SUCCESS,
);
export const setBookErrorAC = createAppAction<SetBookErrorAction>(
	BOOKS_ACTIONS_TYPES.SET_BOOK_ERROR,
);

export const setFavoriteBooksAC = createAppAction<SetFavoriteBooksAction>(
	BOOKS_ACTIONS_TYPES.SET_FAVORITE_BOOKS,
);
export const setReadBooksAC = createAppAction<SetReadBooksAction>(
	BOOKS_ACTIONS_TYPES.SET_READ_BOOKS,
);

export function getBooksAction(searchString = ''): AppThunk<void> {
	return dispatch => {
		dispatch(setBooksPendingAC());
		getBooksApi(searchString)
			.then(result => {
				dispatch(setBooksSuccessAC(result.data.books));
			})
			.catch(error => dispatch(setBooksErrorAC(error.message)));
	};
}

export function getBookAction(id: string): AppThunk<void> {
	return dispatch => {
		dispatch(setBookPendingAC(id));
		getBookApi(id)
			.then(result => {
				dispatch(setBookSuccessAC(result.data.book));
			})
			.catch(error => {
				dispatch(
					setBookErrorAC(
						error?.response?.data?.message ??
							'Something went wrong',
					),
				);
			});
	};
}

export function setFavoriteBookId(id: string): AppThunk<void> {
	return (dispatch, getState) => {
		const favoriteList = getFavoriteList(getState());
		const readList = getReadList(getState());
		if (favoriteList.includes(id)) {
			dispatch(setFavoriteBooksAC(favoriteList.filter(x => x !== id)));
			dispatch(setReadBooksAC(readList.filter(x => x !== id)));
		} else {
			dispatch(setFavoriteBooksAC([...favoriteList, id]));
		}
	};
}

export function setReadBookId(id: string): AppThunk<void> {
	return (dispatch, getState) => {
		const readList = getReadList(getState());
		if (readList.includes(id)) {
			dispatch(setReadBooksAC(readList.filter(x => x !== id)));
		} else {
			dispatch(setReadBooksAC([...readList, id]));
		}
	};
}
