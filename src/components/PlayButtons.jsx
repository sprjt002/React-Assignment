function PlayButtons({ onPlay, onStop, volumeChange, onVolumeChange, cpmValue, onCpmChange }) {
    return (
        <div className="play-buttons-box">
            <h4 className="text-center">Playback Controls</h4>

            {/* Row 1: Play / Stop */}
            <div className="row justify-content-center">
                <div className="col-auto">
                    <button className="btn btn-outline-primary" onClick={onPlay}>
                        Play
                    </button>
                </div>
                <div className="col-auto">
                    <button className="btn btn-outline-danger" onClick={onStop}>
                        Stop
                    </button>
                </div>
            </div>

            {/* Row 2: Set CPM */}
            <div className="row justify-content-center mt-3">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">setCPM</span>
                    <input
                        type="number"
                        className="form-control"
                        aria-label="cpm"
                        id="cpm_text_input"
                        placeholder="120"
                        value={cpmValue}
                        onChange={onCpmChange}
                        min="20"
                        max="300"
                    />
                </div>
            </div>

            {/* Row 3: Volume */}
            <div className="row justify-content-center">
                <div className="text-center">
                    <label htmlFor="volume_range" className="header">Volume</label>
                    <input
                        type="range"
                        value={volumeChange}
                        className="form-range"
                        min="0"
                        max="2"
                        step="0.1"
                        onChange={onVolumeChange}
                        id="volume_range"
                    />
                </div>
            </div>

            {/* Row 4: Checkboxes */}
            <div className="row justify-content-center mt-3">
                <div className="d-flex justify-content-center align-items-center gap-3">
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="s1" />
                        <label className="header" htmlFor="s1">s1</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="d1" />
                        <label className="header" htmlFor="d1">d1</label>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="d2" />
                        <label className="header" htmlFor="d2">d2</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayButtons;
