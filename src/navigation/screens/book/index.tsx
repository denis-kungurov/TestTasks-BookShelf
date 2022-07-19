import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	StyleSheet,
	Pressable,
} from 'react-native';
import { useSelector } from 'react-redux';
import { setFavoriteBookId, setReadBookId } from 'store/books/actions';
import {
	getBookDetails,
	getFavoriteList,
	getReadList,
} from 'store/books/selectors/getters';

import { ICON_STAR_ENABLED, ICON_SUCCESS } from 'constants/images';
import { useAppDispatch } from 'hooks/redux';

function BookScreenComponent() {
	const dispatch = useAppDispatch();
	const navigation = useNavigation();
	const favoriteList = useSelector(getFavoriteList);
	const readList = useSelector(getReadList);
	const book = useSelector(getBookDetails);

	useEffect(() => {
		if (!book) {
			navigation.goBack();
		} else {
			navigation.setOptions({
				title: book.title,
			});
		}
	}, [book, navigation]);

	const isFavoriteBook = useMemo(
		() => favoriteList.includes(book?.id ?? ''),
		[book?.id, favoriteList],
	);
	const isReadBook = useMemo(
		() => readList.includes(book?.id ?? ''),
		[book?.id, readList],
	);

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

	const handleFavoriteBook = useCallback(() => {
		book && dispatch(setFavoriteBookId(book.id));
	}, [book, dispatch]);

	const handleReadBook = useCallback(() => {
		book && dispatch(setReadBookId(book.id));
	}, [book, dispatch]);

	if (!book) return null;

	return (
		<ScrollView
			style={styles.scroll}
			contentContainerStyle={styles.scrollContainer}>
			<Image
				resizeMode="contain"
				source={{
					uri: book.coverImageUrl,
				}}
				style={styles.image}
			/>
			<View style={styles.infoContainer}>
				<Text style={styles.title}>{book.title}</Text>
				<Text style={styles.author}>{book.author}</Text>
				<View style={styles.favButtonsContainer}>
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
				<Text style={styles.topSpace}>
					{'Pages count: ' + book.pageCount}
				</Text>
				<Text>{'Publisher: ' + book.publisher}</Text>
				<Text style={styles.topSpace}>{book.synopsis}</Text>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scroll: {
		flex: 1,
		padding: 20,
	},
	scrollContainer: {
		paddingBottom: 30,
		alignItems: 'center',
	},
	image: {
		width: 200,
		height: 300,
	},
	infoContainer: {
		alignItems: 'center',
		flex: 1,
		marginTop: 20,
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
	favButtonsContainer: {
		flexDirection: 'row',
		marginVertical: 10,
	},
	favButton: {
		width: 100,
		height: 70,
		backgroundColor: '#E2E6ED',
		padding: 5,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 10,
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

const BookScreen = memo(BookScreenComponent);
export default BookScreen;
