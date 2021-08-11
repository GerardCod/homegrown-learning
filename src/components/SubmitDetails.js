import React, { Fragment, useEffect, useState } from 'react';
import Comment from './Comment';
import SubmitFileItem from './SubmitFileItem';

const SubmitDetails = ({ activity, user }) => {
  const [data, setData] = useState();

  const getMySubmit = activity => {
    const mySubmit = activity.submits.filter(e => e.user.email === user.email)[0];
    setData({ ...mySubmit });
  }

  useEffect(() => {
    getMySubmit(activity);
  }, [getMySubmit]);

  return (
    <Fragment>
      {
        (data && data.submit.evidences.length > 0) &&
        data.submit.evidences.map((e, idx) => <SubmitFileItem file={e} remove={false} key={`submit-file:${idx}`} />)
      }
      {
        (data && data.comments && data.comments.length > 0) &&
        <div>
          <h3>Comentarios</h3>
          {
            data.comments.map((comment, idx) => <Comment {...comment} key={`comment-${idx}`} />)
          }
        </div>
      }
    </Fragment>
  );
}

export default SubmitDetails;