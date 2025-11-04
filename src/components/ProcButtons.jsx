function ProcButtons({ onProc, onProcPlay }) {
  return (
      <>
      <br />
          <div className="row">
              <div className="col-auto">
                  <button id="process" className="btn btn-primary" onClick={onProc} >Preprocess</button>
              </div>
              <div className="col-auto">
                  <button id="process_play" className="btn btn-primary" onClick={onProcPlay} >Proc & Play</button>
              </div>
          </div>
      </>
  );
}

export default ProcButtons;