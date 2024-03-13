import rootReducers from "../reducers";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "../Api/index";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore( {
    reducer: persistedReducer,
    middleware: ( defaultMiddleware ) => [
        ...defaultMiddleware( { serializableCheck: false } ), api.middleware ]
} );

const persistor = persistStore(store);

export { store, persistor };