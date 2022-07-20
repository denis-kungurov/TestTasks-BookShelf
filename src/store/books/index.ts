import { BooksActionTypes, BOOKS_ACTIONS_TYPES, BooksState } from './types';

const initialState: BooksState = {
	bookDetails: null,
	error: null,
	bookError: null,
	list: [],
	booksLoading: false,
	loadingBookId: null,
	favoriteList: [],
	readList: [],
};

export default function (
	state: BooksState = initialState,
	action: BooksActionTypes,
): BooksState {
	switch (action.type) {
		case BOOKS_ACTIONS_TYPES.SET_BOOKS_PENDING:
			return {
				...state,
				booksLoading: true,
				error: null,
			};
		case BOOKS_ACTIONS_TYPES.SET_BOOKS_SUCCESS:
			return {
				...state,
				list: action.payload,
				booksLoading: false,
			};
		case BOOKS_ACTIONS_TYPES.SET_BOOKS_ERROR:
			return {
				...state,
				error: action.payload,
				booksLoading: false,
			};
		case BOOKS_ACTIONS_TYPES.SET_BOOK_PENDING:
			return {
				...state,
				loadingBookId: action.payload,
				bookError: null,
				bookDetails: null,
			};
		case BOOKS_ACTIONS_TYPES.SET_BOOK_SUCCESS:
			return {
				...state,
				bookDetails: action.payload,
				loadingBookId: null,
			};
		case BOOKS_ACTIONS_TYPES.SET_BOOK_ERROR:
			return {
				...state,
				bookError: action.payload,
				loadingBookId: null,
				bookDetails: null,
			};

		case BOOKS_ACTIONS_TYPES.SET_FAVORITE_BOOKS:
			return {
				...state,
				favoriteList: action.payload,
			};
		case BOOKS_ACTIONS_TYPES.SET_READ_BOOKS:
			return {
				...state,
				readList: action.payload,
			};

		default:
			return state;
	}
}
