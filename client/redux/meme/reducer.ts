import produce from 'immer';
import { AnyAction } from 'redux';
import { UPDATE_MEMES, SELECT_MEME } from './types';

interface MemeState {
    memes?: any;
    selectedMeme?: any;
}

const initialState: MemeState = {
    memes: null,
    selectedMeme: null
}

const memeReducer = produce((draft: MemeState = initialState, action: AnyAction) => {
    const { type, payload }: AnyAction = action;
    
    switch (type) {
        case UPDATE_MEMES:
            draft.memes = payload;
            break;

        case SELECT_MEME:
            draft.selectedMeme = draft.memes[payload];
            break;

        default:
            return draft;
    }
});

export default memeReducer;