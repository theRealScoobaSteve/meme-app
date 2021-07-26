
import thunk from 'redux-thunk';
import authReducer from './auth/reducer';
import memeReducer from './meme/reducer';
import {createWrapper, Context, HYDRATE} from 'next-redux-wrapper';
import { createStore, Store, combineReducers, applyMiddleware } from 'redux';
import { AuthState } from './auth/reducer';
import { MemeState } from './meme/reducer';

export interface State {
    auth: AuthState,
    meme: MemeState
}

const rootReducer: State = combineReducers({
    auth: authReducer,
    meme: memeReducer,
});

export const store: State = createStore(rootReducer, applyMiddleware(thunk));

// create a makeStore function
const makeStore = (context: Context) => store;

// export an assembled wrapper
export const wrapper = createWrapper<Store<State>>(makeStore);