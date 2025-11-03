function PlayButtons({ onPlay, onStop }) {
  return (
      <>
          <div className="row">
              <div className="col-auto">
                  <button id="play" className="btn btn-primary" onClick={onPlay} >Play</button>
              </div>
              <div className="col-auto">
                  <button id="stop" className="btn btn-danger" onClick={onStop} >Stop</button>
              </div>
          </div>
      </>
  );
}

export default PlayButtons;