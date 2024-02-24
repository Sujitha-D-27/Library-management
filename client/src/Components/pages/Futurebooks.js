import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../Books.css';
const Futurebooks = () => {
    const[books,setBooks]=useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10);
    
   
    useEffect(()=>{
        const fetchallbooks= async ()=>{
            try{
              const res= await axios.get("http://localhost:6060/future")
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
   
    
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
   
    
     
  return (  
    <div>
        <h1>Future Books</h1>
        <div className="books">
               {currentBooks.map((book)=>(
                <div className="book" key={book.ID}>

                    <h2>{book.Title}</h2>
                    <h2>{book.Author}</h2>
                    <p>{book.Description}</p>
                    <h2>{book.Publish_date}</h2>
                  
                   
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
           
        </div>
  ) 
}

export default Futurebooks