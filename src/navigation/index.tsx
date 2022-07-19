import { useFlipper } from '@react-navigation/devtools';
import {
	createNavigationContainerRef,
	NavigationContainer,
	NavigationContainerRef,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initApi } from 'api';
import React, { useEffect } from 'react';

import { ROUTES } from '../constants/routes';

import BookScreen from './screens/book';
import BooksListScreen from './screens/books-list';

const Stack = createStackNavigator();
export const navigationRef = createNavigationContainerRef();

export default function Navigators(): React.ReactElement {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	useFlipper(navigationRef as React.RefObject<NavigationContainerRef<any>>);

	useEffect(() => initApi(), []);

	return (
		<NavigationContainer ref={navigationRef}>
			<Stack.Navigator initialRouteName={ROUTES.BOOKS_LIST}>
				<Stack.Screen
					name={ROUTES.BOOKS_LIST}
					options={{
						title: 'Books',
					}}
					component={BooksListScreen}
				/>
				<Stack.Screen name={ROUTES.BOOK} component={BookScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
