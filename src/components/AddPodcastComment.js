import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

const AddPodcastComment = ({podcast}) => {
  const [data, setData] = useState({});

  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.event.value,
    });
  } 

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Submitting... ', data);
  }

  return (
    <form className="flex">
      <label htmlFor="comment">Agrega un comentario</label>
      <input type="text" required name="comment" id="comment" onChange={handleChange} />
      <button>
        <FaChevronRight />
      </button>
    </form>
  );
}

export default AddPodcastComment;