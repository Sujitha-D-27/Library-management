import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Add.css';

const Add = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    publish_date: '',
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post('http://localhost:3000/books', book);
      navigate('/books'); 
    } catch (err) {
      console.log(err);
    }
   
    
  };
 

  console.log(book);

  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input type="text" placeholder="title" onChange={handleChange} name="title" />
      <input type="text" placeholder="author" onChange={handleChange} name="author" />
      <input type="text" placeholder="description" onChange={handleChange} name="description" />
      <input type="date" placeholder="" onChange={handleChange} name="publish_date" />
      <button onClick={handleClick}>Add</button>
      
    </div>
  );
};

export default Add;
