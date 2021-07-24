import React, { useRef, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

const AddPodcastComment = ({ submitComment }) => {
  const [data, setData] = useState({});
  const formRef = useRef({});

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value.trim(),
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    submitComment(data)
    setData({});
    formRef.current.reset();
  }

  return (
    <form className="flex flex--column AddComment" onSubmit={handleSubmit} ref={formRef}>
      <label className="AddComment__Label" htmlFor="comment">Agrega un comentario</label>
      <div className="AddComment__Input flex content--between">
        <input type="text" required name="comment" id="comment" onChange={handleChange} />
        <button disabled={!data.comment} className="cursor--pointer Button--Primary text--white">
          <FaChevronRight />
        </button>
      </div>
    </form>
  );
}

export default AddPodcastComment;