function DJcontrols({ volumeChange, onVolumeChange }) {
    return (
        <>

            <div className="dj-controls-box">
                <div className="row justify-content-center">
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
                    <div className="text-center" >
                        <label htmlFor="volume_range" className="header">Volume</label>
                        <input type="range" value={volumeChange} className="form-range" min="0" max="2" step="0.1" onChange={onVolumeChange} id="volume_range" />
                    </div>
                   

                    {/*
            checkboxes
            */}
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
            

      </>
  );
}

export default DJcontrols;