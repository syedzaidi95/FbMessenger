import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native'; // Native LocalStorage
// import storage from 'redux-persist/lib/storage'; // Web LocalStorage
import thunk from 'redux-thunk';
import rootReducer from './rootReducer'

const persistConfig = { key: 'root', storage: AsyncStorage }
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

export { store, persistor }
