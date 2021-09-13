/* eslint-disable */
import {createContext} from 'preact';

export const videoState = {
    PAUSE: 'pause',
    PLAY: 'play'
}

export const VideoContext = createContext({
    state: videoState.PAUSE,
    setState: (state: string) => {},
    currentTime: 0,
    setCurrentTime: (currentTime: number) => {},
});