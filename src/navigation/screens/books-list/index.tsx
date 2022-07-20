import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
	View,
	ScrollView,
	NativeSyntheticEvent,
	TextInputSubmitEditingEventData,
	TextInput,
	StyleSheet,
	Pressable,
	Text,
	ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { getBookAction, getBooksAction } from 'store/books/actions';
import {
	getBookDetails,
	getBookError,
	getBooksList,
	getBooksLoading,
	getFavoriteList,
	getReadList,
} from 'store/books/selectors/getters';
import { Book } from 'store/books/types';
import { sh, sw } from 'styles';

import { ROUTES } from 'constants/routes';
import { useAppDispatch } from 'hooks/redux';

import BookItem from './components/book-item';

function BooksListScreenComponent() {
	const dispatch = useAppDispatch();
	const navigation = useNavigation();
	const books = useSelector(getBooksList);
	const bookDetails = useSelector(getBookDetails);
	const bookError = useSelector(getBookError);
	const booksLoading = useSelector(getBooksLoading);
	const favoriteList = useSelector(getFavoriteList);
	const readList = useSelector(getReadList);
	const [searchText, setSearchText] = useState('');
	const [showFavorite, setShowFavorite] = useState(false);
	const [showRead, setShowRead] = useState(false);

	useEffect(() => {
		dispatch(getBooksAction(searchText));
	}, [dispatch, searchText]);

	useEffect(() => {
		if (bookError) {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: bookError,
			});
		}
	}, [bookError]);

	const booksList = useMemo(() => {
		if (showFavorite) {
			return books.filter(book => favoriteList.includes(book?.id));
		} else if (showRead) {
			return books.filter(book => readList.includes(book?.id));
		}
		return books;
	}, [books, favoriteList, readList, showFavorite, showRead]);

	useEffect(() => {
		if (bookDetails) {
			navigation.navigate(ROUTES.BOOK);
		}
	}, [bookDetails, navigation]);

	const handleSearch = useCallback(
		(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
			setSearchText(e.nativeEvent.text);
		},
		[],
	);

	const handleOpenBook = useCallback(
		(id: string) => {
			dispatch(getBookAction(id));
		},
		[dispatch],
	);

	const renderBook = useCallback(
		(book: Book) => (
			<BookItem key={book?.id} onPress={handleOpenBook} book={book} />
		),
		[handleOpenBook],
	);

	const handleShowRead = useCallback(() => setShowRead(true), []);
	const handleShowFavorite = useCallback(() => setShowFavorite(true), []);
	const handleShowAll = useCallback(() => {
		setShowFavorite(false);
		setShowRead(false);
	}, []);

	const listView = useMemo(() => {
		if (booksList.length) {
			return (
				<ScrollView
					style={styles.scroll}
					contentContainerStyle={styles.scrollContainer}>
					{booksList.map(renderBook)}
				</ScrollView>
			);
		} else {
			return (
				<View style={styles.emptyContainer}>
					<Text>
						{showFavorite
							? 'The list of favorite books is empty'
							: 'The list of read books is empty'}
					</Text>
				</View>
			);
		}
	}, [booksList, renderBook, showFavorite]);

	return (
		<View style={styles.container}>
			<View style={styles.filtersContainer}>
				{showRead || showFavorite ? (
					<Pressable
						style={styles.filterButton}
						onPress={handleShowAll}>
						<Text>{'Show all'}</Text>
					</Pressable>
				) : (
					<>
						<Pressable
							style={styles.filterButton}
							onPress={handleShowFavorite}>
							<Text>{'Show Favorite'}</Text>
						</Pressable>

						<Pressable
							style={styles.filterButton}
							onPress={handleShowRead}>
							<Text>{'Show Read'}</Text>
						</Pressable>
					</>
				)}
			</View>
			<View>
				<TextInput
					style={styles.searchContainer}
					placeholder={'Enter search text'}
					placeholderTextColor={'#555969'}
					onEndEditing={handleSearch}
				/>
			</View>
			{booksLoading ? (
				<ActivityIndicator
					style={{
						flex: 1,
					}}
					size="large"
				/>
			) : (
				listView
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scroll: {
		padding: sh(10),
	},
	scrollContainer: {
		paddingBottom: sh(30),
	},
	searchContainer: {
		margin: sh(10),
		padding: sh(10),
		backgroundColor: '#E2E6ED',
	},
	filtersContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: sh(10),
	},
	filterButton: {
		backgroundColor: '#E2E6ED',
		width: '30%',
		paddingVertical: sh(10),
		borderRadius: sh(15),
		alignItems: 'center',
		marginHorizontal: sw(10),
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

const BooksListScreen = memo(BooksListScreenComponent);
export default BooksListScreen;
