import axios from 'axios';
import { React, useEffect, useState } from 'react';
import Cart from './Cart';
import './Home.css';
;
const Home = () => {
    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10);
    const [cartItems, setCartItems] = useState([]); 

    useEffect(() => {
        const fetchallbooks = async () => {
            try {
                const res = await axios.get("https://library-management-1-m3xj.onrender.com/Admin")
                setBooks(res.data);

            } catch (err) {
                console.log(err)
            }
        }
        fetchallbooks()
    }, [])

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const addToCart = (book) => {
        setCartItems([...cartItems, book]);
      };
      const removeFromCart = (bookID) => {
        const updatedCart = cartItems.filter((item) => item.ID !== bookID);
        setCartItems(updatedCart);
      };

    return (
        <div>
            <h1>Library Management System</h1>
            <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="search-input"
            />
            <div className="books-container">
                {books
                    .filter((book) => {
                        const searchTerm = search.toLowerCase();
                        return (
                            book.Title.toLowerCase().includes(searchTerm) ||
                            book.Description.toLowerCase().includes(searchTerm)
                        );
                    })
                    .map((book) => (
                        <div className="book-item" key={book.ID}>
                            <h2>{book.Title}</h2>
                            <h2>{book.Author}</h2>
                            <p>{book.Description}</p>
                            <h2>{book.Publish_date}</h2>
                            <button className="book-button"  onClick={() => addToCart(book)}>Book</button>
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
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
        </div>
    )
}

export default Home;
