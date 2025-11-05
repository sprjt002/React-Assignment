function DJcontrols({ onVolumeChange }) {
    return (
        <>
            {/*
            set CPM
            */}
            <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">setCPM</span>
                <input type="text" className="form-control" aria-label="cpm" id="cpm_text_input" placeholder="120" aria-describedby="cpm_label" />

            </div>

            {/*
            Volume
            */}
            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="2" step="0.1" onMouseUp={onVolumeChange} id="volume_range" />

            {/*
            checkboxes
            */}
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="s1"/>
                <label className="form-check-label" htmlFor="s1">s1</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="d1" />
                <label className="form-check-label" htmlFor="d1">d1</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="d2" />
                <label className="form-check-label" htmlFor="d2">d2</label>
            </div>

      </>
  );
}

export default DJcontrols;