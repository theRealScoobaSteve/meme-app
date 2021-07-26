import { State } from '../store';

export const getAccessToken = (state: State): string => state.auth.accessToken;