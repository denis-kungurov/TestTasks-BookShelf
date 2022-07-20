import { RootState } from 'store';

export const getBooksList = (state: RootState) => state.books.list;
export const getBookDetails = (state: RootState) => state.books.bookDetails;
export const getBookError = (state: RootState) => state.books.bookError;
export const getLoadingBookId = (state: RootState) => state.books.loadingBookId;
export const getBooksLoading = (state: RootState) => state.books.booksLoading;
export const getError = (state: RootState) => state.books.error;
export const getFavoriteList = (state: RootState) => state.books.favoriteList;
export const getReadList = (state: RootState) => state.books.readList;
