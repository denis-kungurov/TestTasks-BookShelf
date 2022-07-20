export enum BOOKS_ACTIONS_TYPES {
	SET_BOOKS_PENDING = 'SET_BOOKS_PENDING',
	SET_BOOKS_SUCCESS = 'SET_BOOKS_SUCCESS',
	SET_BOOKS_ERROR = 'SET_BOOKS_ERROR',
	SET_BOOK_PENDING = 'SET_BOOK_PENDING',
	SET_BOOK_SUCCESS = 'SET_BOOK_SUCCESS',
	SET_BOOK_ERROR = 'SET_BOOK_ERROR',
	SET_FAVORITE_BOOKS = 'SET_FAVORITE_BOOKS',
	SET_READ_BOOKS = 'SET_READ_BOOKS',
}

export interface Book {
	title: string;
	author: string;
	coverImageUrl: string;
	id: string;
	pageCount: number;
	publisher: string;
	synopsis: string;
}

export interface BooksState {
	list: Book[];
	favoriteList: string[];
	readList: string[];
	booksLoading: boolean;
	loadingBookId: string | null;
	bookDetails: Book | null;
	error: string | null;
	bookError: string | null;
}

export interface SetBooksPendingAction {
	type: BOOKS_ACTIONS_TYPES.SET_BOOKS_PENDING;
}

export interface SetBooksSuccessAction {
	type: BOOKS_ACTIONS_TYPES.SET_BOOKS_SUCCESS;
	payload: Book[];
}

export interface SetBooksErrorAction {
	type: BOOKS_ACTIONS_TYPES.SET_BOOKS_ERROR;
	payload: string;
}

export interface SetBookPendingAction {
	type: BOOKS_ACTIONS_TYPES.SET_BOOK_PENDING;
	payload: string;
}

export interface SetBookSuccessAction {
	type: BOOKS_ACTIONS_TYPES.SET_BOOK_SUCCESS;
	payload: Book;
}

export interface SetBookErrorAction {
	type: BOOKS_ACTIONS_TYPES.SET_BOOK_ERROR;
	payload: string;
}

export interface SetFavoriteBooksAction {
	type: BOOKS_ACTIONS_TYPES.SET_FAVORITE_BOOKS;
	payload: string[];
}

export interface SetReadBooksAction {
	type: BOOKS_ACTIONS_TYPES.SET_READ_BOOKS;
	payload: string[];
}

export type BooksActionTypes =
	| SetBooksPendingAction
	| SetBooksSuccessAction
	| SetBooksErrorAction
	| SetBookPendingAction
	| SetBookSuccessAction
	| SetBookErrorAction
	| SetFavoriteBooksAction
	| SetReadBooksAction;
