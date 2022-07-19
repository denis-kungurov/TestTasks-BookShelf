import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';

import Navigator from './navigation';
import { persistor, store } from './store';

export default function App(): React.ReactElement {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<FlipperAsyncStorage />
				<SafeAreaProvider>
					<Navigator />
				</SafeAreaProvider>
			</PersistGate>
		</Provider>
	);
}
