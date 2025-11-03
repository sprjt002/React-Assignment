function ProcButtons() {
  return (
      <>
      <br />
          <div className="row">
              <div className="col-auto">
                  <button id="process" className="btn btn-primary">Preprocess</button>
              </div>
              <div className="col-auto">
                  <button id="process_play" className="btn btn-primary">Proc & Play</button>
              </div>
          </div>
      </>
  );
}

export default ProcButtons;