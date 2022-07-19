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
import { useSelector } from 'react-redux';
import { getBookAction, getBooksAction } from 'store/books/actions';
import {
	getBookDetails,
	getBookError,
	getBookLoading,
	getBooksList,
	getBooksLoading,
	getFavoriteList,
	getReadList,
} from 'store/books/selectors/getters';
import { Book } from 'store/books/types';

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
	const bookLoading = useSelector(getBookLoading);
	const favoriteList = useSelector(getFavoriteList);
	const readList = useSelector(getReadList);
	const [searchText, setSearchText] = useState('');
	const [showFavorite, setShowFavorite] = useState(false);
	const [showRead, setShowRead] = useState(false);
	const [loadingBookId, setLoadingBookId] = useState(null);

	useEffect(() => {
		dispatch(getBooksAction(searchText));
	}, [dispatch, searchText]);

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
		(book: Book) => <BookItem onPress={handleOpenBook} book={book} />,
		[handleOpenBook],
	);

	const handleShowRead = useCallback(() => setShowRead(true), []);
	const handleShowFavorite = useCallback(() => setShowFavorite(true), []);
	const handleShowAll = useCallback(() => {
		setShowFavorite(false);
		setShowRead(false);
	}, []);

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
				<ScrollView
					style={styles.scroll}
					contentContainerStyle={styles.scrollContainer}>
					{booksList.map(renderBook)}
				</ScrollView>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scroll: {
		padding: 10,
	},
	scrollContainer: {
		paddingBottom: 30,
	},
	searchContainer: {
		margin: 10,
		padding: 10,
		backgroundColor: '#E2E6ED',
	},
	filtersContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 10,
	},
	filterButton: {
		backgroundColor: '#E2E6ED',
		width: '30%',
		paddingVertical: 10,
		borderRadius: 15,
		alignItems: 'center',
		marginHorizontal: 10,
	},
});

const BooksListScreen = memo(BooksListScreenComponent);
export default BooksListScreen;
