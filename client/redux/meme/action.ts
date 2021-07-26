import api from '../../services/api';
import { ThunkAction } from 'redux-thunk';
import { UPDATE_MEMES, SELECT_MEME } from './types';
import { Action, ActionCreator, Dispatch } from 'redux';

const setMemeData: ActionCreator<Action> = (token: string): Action => {
    return {
        type: UPDATE_MEMES,
        payload: token
    };
}

export const setSelectedMeme: ActionCreator<Action> = (id: number) => {
    return {
        type: SELECT_MEME,
        payload: id
    };
}

export const updateMemeData: ActionCreator<ThunkAction<Action, any, void>> = () => {
    return async (dispatch: Dispatch): Action => {
        try {
            const { data } = await api.get('/api/meme/all');
        
            dispatch(setMemeData(data));
        } catch (e) {
            console.log(e);
        }
        
    }
}