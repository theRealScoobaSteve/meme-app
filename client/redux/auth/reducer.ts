import produce from 'immer';
import { AnyAction } from 'redux';
import { UPDATE_TOKEN } from './types';

export interface AuthState {
    accessToken?: string;
}

const initialState: AuthState = {
    accessToken: null
}

const authReducer = produce((draft: AuthState = initialState, action: AnyAction) => {
    const { type, payload }: AnyAction = action;
    
    switch (type) {
        case UPDATE_TOKEN:
            draft.accessToken = payload;
            break;

        default:
            return draft;
    }
});

export default authReducer;