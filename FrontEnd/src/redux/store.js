import {createStore,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers/index";
import { persistStore,persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig={
    key:'main-root',
    storage
}
const persistedReducer=persistReducer(persistConfig,reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store= createStore(reducers,
    composeEnhancers(applyMiddleware(thunk))
    );
const persitStore=persistStore(store);
export{persitStore};
export default store;