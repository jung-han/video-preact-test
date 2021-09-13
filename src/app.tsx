import { createRef, FunctionalComponent, h, RefObject } from 'preact';
import { useContext, useState } from "preact/hooks";
import { forwardRef } from 'preact/compat'
import { VideoContext, videoState } from './VideoContext';

type StartButtonProps = { videoRef: RefObject<HTMLVideoElement> };
type CurrentTimeProps = { currentTime: number };

const CurrentTime = ({ currentTime }: CurrentTimeProps) => {
    return <div>{currentTime}</div>
}

const VideoStartButton = ({ videoRef }: StartButtonProps) => {
    const { state } = useContext(VideoContext);
    const isPlaying = state === videoState.PLAY;
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
    const {setState, setCurrentTime} = useContext(VideoContext);

    const setPlay = () => setState(videoState.PLAY);
    const setPause = () => setState(videoState.PAUSE);
    const updateCurrentTime = () => setCurrentTime(ref.current.currentTime);

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
    const [state, setState] = useState(videoState.PAUSE);
    const [currentTime, setCurrentTime] = useState(0);
    const videoRef = createRef();

    return (
        <div id="preact_root">
            <VideoContext.Provider value={{state, setState, currentTime, setCurrentTime}}>
                <Video ref={videoRef} />
                <VideoStartButton videoRef={videoRef} />
                <CurrentTime currentTime={currentTime} />
            </VideoContext.Provider>
        </div>
    );
};

export default App;
