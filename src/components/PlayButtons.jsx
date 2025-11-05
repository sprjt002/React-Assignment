function PlayButtons({ onPlay, onStop }) {
    return (
        <div className="play-buttons-box">
            <h4 className="text-center" >Playback Controls</h4>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <button id="play" className="btn btn-primary" onClick={onPlay}>Play</button>
                </div>
                <div className="col-auto">
                    <button id="stop" className="btn btn-danger" onClick={onStop}>Stop</button>
                </div>
            </div>
        </div>
    );
}

export default PlayButtons;
