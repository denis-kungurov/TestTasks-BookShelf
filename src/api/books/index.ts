import { API } from 'api';
import { Book } from 'store/books/types';

export function getBooksApi(searchString = ''): Promise<Book[]> {
	let query = '';
	if (searchString) {
		query = `?q=${searchString}`;
	}
	return API.get(`/books${query}`);
}

export function getBookApi(id: string): Promise<Book> {
	return API.get(`/books/${id}`);
}
