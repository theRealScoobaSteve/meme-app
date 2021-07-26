
import thunk from 'redux-thunk';
import authReducer from './auth/reducer';
import memeReducer from './meme/reducer';
import {createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import { createStore, Store, combineReducers, applyMiddleware } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    meme: memeReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

// create a makeStore function
const makeStore = (context: Context) => store;

// export an assembled wrapper
export const wrapper = createWrapper<Store<any>>(makeStore);