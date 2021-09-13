import {createRef, FunctionalComponent, h, RefObject} from 'preact';
import {forwardRef} from 'preact/compat'
import {actionType, useVideoDispatch, useVideoState, VideoStateProvider, videoStateType} from './VideoContext';

const CurrentTime = () => {
    const state = useVideoState();

    return <div>{state.currentTime}</div>
}

const VideoStartButton = ({ videoRef }: { videoRef: RefObject<HTMLVideoElement> }) => {
const state = useVideoState();

const isPlaying = state.videoState === videoStateType.PLAY;
const toggleVideoState = () => {
    if(isPlaying) {
        videoRef.current?.pause();
    } else {
        videoRef.current?.play();
    }
}

return <button onClick={toggleVideoState}>{isPlaying ? '멈춰!' : '시작!'}</button>
}

const Video = forwardRef<HTMLVideoElement>((props, ref) => {
    const dispatch = useVideoDispatch();

    const setPlay = () => dispatch({ type: actionType.SET_STATE, videoState: videoStateType.PLAY });
    const setPause = () => dispatch({ type: actionType.SET_STATE, videoState: videoStateType.PAUSE });
    const updateCurrentTime = () => dispatch({ type: actionType.UPDATE_CURRENT_TIME, currentTime: ref.current.currentTime });

    return (
        <video
            src="http://techslides.com/demos/sample-videos/small.mp4"
            ref={ref}
            onPlay={setPlay}
            onPause={setPause}
            onTimeUpdate={updateCurrentTime}
        />
    )
});

const App: FunctionalComponent = () => {
    const videoRef = createRef();

    return (
        <VideoStateProvider>
            <div id="preact_root">
                <Video ref={videoRef} />
                <VideoStartButton videoRef={videoRef} />
                <CurrentTime />
            </div>
        </VideoStateProvider>
    );
};

export default App;
