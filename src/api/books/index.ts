import { getAPI } from 'api';
import { Book } from 'store/books/types';

export function getBooksApi(searchString = ''): Promise<Book[]> {
	let query = '';
	if (searchString) {
		query = `?q=${searchString}`;
	}
	return getAPI().get(`/books${query}`);
}

export function getBookApi(id: string): Promise<Book> {
	return getAPI().get(`/books/${id}`);
}
