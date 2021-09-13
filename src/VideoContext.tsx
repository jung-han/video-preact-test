import {createContext, JSX, h} from 'preact';
import {useReducer, useContext} from 'preact/hooks';

type VideoAction =
    { type: actionType.UPDATE_CURRENT_TIME; currentTime: number }
    | { type: actionType.SET_STATE; videoState: videoStateType };

type Dispatch<T> = (action: T) => void;
type VideoDispatch = Dispatch<VideoAction>;

interface VideoState {
    currentTime: number;
    videoState: videoStateType;
}

export enum actionType {
    UPDATE_CURRENT_TIME,
    SET_STATE,
}

export enum videoStateType {
    PAUSE = 'pause',
    PLAY = 'play'
}

const initialState: VideoState = {
    videoState: videoStateType.PAUSE,
    currentTime: 0,
}

const videoReducer = (state: VideoState, action: VideoAction) => {
    switch (action.type) {
        case actionType.SET_STATE:
            return {
                ...state,
                videoState: action.videoState,
            }
        case actionType.UPDATE_CURRENT_TIME:
            return {
                ...state,
                currentTime: action.currentTime,
            }
        default:
            throw new Error('Unhandled action');
    }
}

const VideoStateContext = createContext<VideoState>(initialState);
const VideoDispatchContext = createContext<Dispatch<VideoAction>>(() => null);

export function VideoStateProvider({ children }: {children: JSX.Element}) {
    const [state, dispatch] = useReducer(videoReducer, initialState);

    return (
        <VideoStateContext.Provider value={state}>
            <VideoDispatchContext.Provider value={dispatch}>
                {children}
            </VideoDispatchContext.Provider>
        </VideoStateContext.Provider>
    );
}

export function useVideoState() {
    const state = useContext(VideoStateContext);
    if (!state) {
        throw new Error('Cannot find Provider');
    }

    return state;
}

export function useVideoDispatch() {
    const dispatch = useContext(VideoDispatchContext);
    if (!dispatch) {
        throw new Error('Cannot find Provider');
    }

    return dispatch;
}
