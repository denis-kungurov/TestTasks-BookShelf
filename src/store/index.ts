import AsyncStorage from '@react-native-async-storage/async-storage';
import { Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import createDebugger from 'redux-flipper';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import { ThunkAction } from 'redux-thunk';

import books from './books';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const conf: { [key: string]: PersistConfig<any> } = {
	books: {
		key: 'books',
		storage: AsyncStorage,
	},
};

const AppReducer = combineReducers({
	books: persistReducer(conf.books, books),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (state: any, action: Action<string>) => {
	return AppReducer(state, action);
};

export const store = configureStore({
	reducer: rootReducer,
	preloadedState: {},
	middleware: getDefaultMiddleware => {
		const middlewares = getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		});

		if (__DEV__) {
			middlewares.push(createDebugger());
		}

		return middlewares;
	},
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<Result> = ThunkAction<
	Result,
	RootState,
	unknown,
	Action<string>
>;
