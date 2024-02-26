import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Update = () => {
  const navigate = useNavigate(); // Use useNavigate hook

  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    publish_date: ""
  });

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/Admin/${book.id}`, book);
      navigate("/"); // Use navigate function instead of Navigate component
    } catch (err) {
      console.log(err);
    }
  };

  console.log(book);

  return (
    <div className="form">
      <h1>Update Book</h1>
      <input type="text" placeholder="title" onChange={handleChange} name="title" />
      <input type="text" placeholder="author" onChange={handleChange} name="author" />
      <input type="text" placeholder="description" onChange={handleChange} name="description" />
      <input type="date" placeholder="" onChange={handleChange} name="publish_date" />
      <button className="updatebutton" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};

export default Update;
