import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';
import { UPDATE_TOKEN } from './types';

const setToken: ActionCreator<Action> = (token: string) => {
    return {
        type: UPDATE_TOKEN,
        payload: token
    };
}

export const updateToken: ActionCreator<ThunkAction<Action, any, void>> = (
    token: string
) => {
    return async (dispatch: Dispatch): Action => {
        dispatch(setToken(token));
    }
}