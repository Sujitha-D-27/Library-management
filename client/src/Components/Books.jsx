import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Books.css';
const Books = () => {
    const[books,setBooks]=useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10);
    
   
    useEffect(()=>{
        const fetchallbooks= async ()=>{
            try{
              const res= await axios.get("http://localhost:6060/Admin")
              setBooks(res.data);
              
            }catch(err){
               console.log(err) 
            }
        }
        fetchallbooks()
    },[])
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
    const handleDelete=async(ID)=>{
        try{
            await axios.delete(`http://localhost:6060/Admin/`+ID)
             window.location.reload()
            console.log("It has been deleted"+ID)
            
        }
        catch(err){
            console.log(err)
        }
    }
    
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const navigate=useNavigate();
    const navtoupdate=()=>{
        navigate('/update')
    }
    
    const futurebooks=()=>{
      navigate('/futurebooks');
}
    
  return (  
    <div>
        <h1>Library Management System</h1>
        <div className="books">
               {currentBooks.map((book)=>(
                <div className="book" key={book.ID}>

                    <h2>{book.Title}</h2>
                    <h2>{book.Author}</h2>
                    <p>{book.Description}</p>
                    <h2>{book.Publish_date}</h2>
                    <button className="delete" onClick={()=>handleDelete(book.ID)}>Delete</button>
                    <button className="update" onClick={navtoupdate}>Update</button>
                   
               </div>
               ))}
            </div>
            <div className="pagination">
        {Array.from({ length: Math.ceil(books.length / booksPerPage) }, (_, index) => (
          <button key={index + 1} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
            <button><Link to="/add">Add new Book</Link></button>
            <button onClick={futurebooks}>Future Books</button>
            
        </div>
  ) 
}

export default Books