import React, { useState, useRef , Fragment, useContext } from 'react';
import { ActivityContext } from '../contexts/ActivityContext';
import { AuthContext } from '../contexts/AuthContext';
import { generateSubmit, onError, onSuccess } from '../utils';
import SubmitFileItem from './SubmitFileItem';

const SubmitEvidence = ({ activity, email }) => {
  const { addFileToSubmit, addSubmit, removeFileFromSubmit } = useContext(ActivityContext);
  const initialState = (localStorage.getItem('submit')) ? JSON.parse(localStorage.getItem('submit')) : { evidences: [] };
  const [data, setData] = useState(initialState);
  const formRef = useRef({});
  const { getCurrentUser } = useContext(AuthContext);

  const handleChange = e => {
    const file = e.target.files[0];

    if (file.type !== 'application/pdf') {
      onError('Solo puedes elegir archivos PDF.');
    }
    console.log(file);
    addFileToSubmit(data, file, {setSubmit: setData, onError, email});
    formRef.current.reset();
  }

  const handleRemove = (file) => {
    removeFileFromSubmit(data, file, { setSubmit: setData, onError });
  }

  const handleSubmit = e => {
    e.preventDefault();

    const newSubmit = generateSubmit(data, getCurrentUser());
    addSubmit(activity, newSubmit, { onSuccess, onError });
    setData({ evidences: [] });
    formRef.current.reset();
  }

  return (
    <Fragment>
      <form className="flex flex--column Submit" ref={formRef} onSubmit={handleSubmit}>
        <label>Elige un archivo</label>
        <input type="file" className="Submit__Input" accept=".pdf" onChange={handleChange} />
        <button type="submit" className="Button Button--Primary Button--Round text--white" disabled={data.evidences.length === 0}>Entregar trabajo</button>
      </form>
      {
        (data.evidences.length > 0) && data.evidences.map((file, idx) => <SubmitFileItem file={file} removeFile={handleRemove} key={`submit-file: ${idx}`} remove />)
      }
    </Fragment>
  );
};

export default SubmitEvidence;