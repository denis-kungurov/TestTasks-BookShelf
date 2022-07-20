import React, { memo, useCallback, useMemo } from 'react';
import {
	ActivityIndicator,
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { setFavoriteBookId, setReadBookId } from 'store/books/actions';
import {
	getFavoriteList,
	getLoadingBookId,
	getReadList,
} from 'store/books/selectors/getters';
import { Book } from 'store/books/types';

import { ICON_STAR_ENABLED, ICON_SUCCESS } from 'constants/images';
import { useAppDispatch } from 'hooks/redux';

function BookItemComponent({
	onPress,
	book,
}: {
	book: Book;
	onPress: (id: string) => void;
}) {
	const dispatch = useAppDispatch();
	const favoriteList = useSelector(getFavoriteList);
	const loadingBookId = useSelector(getLoadingBookId);
	const readList = useSelector(getReadList);
	const handlePress = useCallback(() => onPress(book.id), [book.id, onPress]);

	const isFavoriteBook = useMemo(
		() => favoriteList.includes(book.id),
		[book.id, favoriteList],
	);
	const isReadBook = useMemo(
		() => readList.includes(book.id),
		[book.id, readList],
	);

	const handleFavoriteBook = useCallback(() => {
		dispatch(setFavoriteBookId(book.id));
	}, [book.id, dispatch]);

	const handleReadBook = useCallback(() => {
		dispatch(setReadBookId(book.id));
	}, [book.id, dispatch]);

	const favButtonStyles = useMemo(
		() => [
			styles.favButton,
			{
				opacity: isFavoriteBook ? 1 : 0.5,
			},
		],
		[isFavoriteBook],
	);

	const readButtonStyles = useMemo(
		() => [
			styles.favButton,
			{
				opacity: isReadBook ? 1 : 0.5,
			},
		],
		[isReadBook],
	);

	const readButtonText = useMemo(
		() => (isReadBook ? 'Mark as Unread' : 'Mark as Read'),
		[isReadBook],
	);

	const favButtonText = useMemo(
		() => (isFavoriteBook ? 'Remove from favorite' : 'Add to favorite'),
		[isFavoriteBook],
	);

	return (
		<>
			<Pressable
				onPress={handlePress}
				style={styles.container}
				key={book.id}>
				<View>
					<Image
						resizeMode="contain"
						source={{
							uri: book.coverImageUrl,
						}}
						style={styles.image}
					/>

					<Pressable
						style={favButtonStyles}
						onPress={handleFavoriteBook}>
						<Image
							style={styles.favIcon}
							source={ICON_STAR_ENABLED}
						/>
						<Text style={styles.favButtonText}>
							{favButtonText}
						</Text>
					</Pressable>
					{isFavoriteBook && (
						<Pressable
							style={readButtonStyles}
							onPress={handleReadBook}>
							<Image
								style={styles.favIcon}
								source={ICON_SUCCESS}
							/>
							<Text style={styles.favButtonText}>
								{readButtonText}
							</Text>
						</Pressable>
					)}
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.title}>{book.title}</Text>
					<Text style={styles.author}>{book.author}</Text>
					<Text style={styles.topSpace}>
						{'Pages count: ' + book.pageCount}
					</Text>
					<Text>{'Publisher: ' + book.publisher}</Text>
					<Text style={styles.topSpace}>{book.synopsis}</Text>
				</View>
				{loadingBookId === book?.id && (
					<ActivityIndicator
						size={'large'}
						color="gray"
						style={{
							...StyleSheet.absoluteFillObject,
							backgroundColor: 'white',
							opacity: 0.5,
						}}
					/>
				)}
			</Pressable>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 20,
		padding: 10,
		marginBottom: 10,
		backgroundColor: 'white',
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
	image: {
		width: 100,
		height: 150,
	},
	infoContainer: {
		alignItems: 'flex-start',
		justifyContent: 'center',
		flex: 1,
		marginLeft: 10,
	},
	title: {
		color: '#2A2D35',
		fontWeight: '600',
		fontSize: 16,
	},
	author: {
		fontStyle: 'italic',
		color: 'gray',
		marginTop: 5,
	},
	topSpace: {
		marginTop: 20,
	},
	favButton: {
		width: 100,
		height: 70,
		backgroundColor: '#E2E6ED',
		padding: 5,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10,
	},
	favButtonText: {
		fontWeight: '500',
		color: 'light-gray',
		textAlign: 'center',
		marginTop: 5,
		fontSize: 10,
	},
	favIcon: {
		width: 20,
		height: 20,
	},
});

const BookItem = memo(BookItemComponent);
export default BookItem;
