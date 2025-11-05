function TextArea({ defaultValue, onChange }) {
  return (
      <>
          <div className="text-area-box" >
              <label htmlFor="exampleFormControlTextarea1" className="form-label"></label>
              <textarea className="form-control" rows="15" defaultValue={defaultValue} onChange={onChange} id="proc" ></textarea>
          </div>
    </>
  );
}

export default TextArea;