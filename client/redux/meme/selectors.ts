import { State } from '../store';

export const getMemes = (state: State): Array<Meme> => state.meme.memes;

export const getSelectedMeme = (state: State): Meme => state.meme.selectedMeme;