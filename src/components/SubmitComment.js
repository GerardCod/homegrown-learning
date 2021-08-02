import React, { Fragment, useRef, useState, useContext } from 'react';
import { ActivityContext } from '../contexts/ActivityContext';
import { AuthContext } from '../contexts/AuthContext';
import { generateSubmit, onError, onSuccess } from '../utils';

const SubmitComment = ({ activity }) => {
  const [data, setData] = useState({activityComment: ''});
  const { addSubmit } = useContext(ActivityContext);
  const { getCurrentUser } = useContext(AuthContext);
  const formRef = useRef({});

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value.trimLeft(),
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    setData({
      activityComment: data.activityComment.trim(),
    });

    const newSubmit = generateSubmit(data, getCurrentUser());
    addSubmit(activity, newSubmit, { onSuccess, onError });
    formRef.current.reset();
    setData({ activityComment: '' });
  }

  return (
    <Fragment>
      <form className="flex flex--column Submit" onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="activityComment" className="Submit__Instruction">Sube un comentario a esta actividad</label>
        <textarea 
          className="Submit__Input" 
          cols="80"
          rows="15"
          name="activityComment" 
          id="activityComment" 
          onChange={handleChange}
          value={data.activityComment}
        ></textarea>
        <button type="submit" className="Button Button--Primary Button--Round text--white" disabled={!data.activityComment}>Entregar trabajo</button>
      </form>
    </Fragment>
  );
};

export default SubmitComment;