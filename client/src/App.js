import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Add from './Components/Add';
import Books from './Components/Books';
import Update from './Components/Update';
import Futurebooks from './Components/pages/Futurebooks';
import Home from './Components/pages/Home';
import Signin from './Components/pages/Signin';
import Signup from './Components/pages/Signup';


function App() {
  return (
        <div className='App'>
         
          <BrowserRouter>
          <Routes>
            <Route path='/users'element={<Home/>}></Route>
            <Route path='/'element={<Signin/>}></Route>
            <Route path='/Signup'element={<Signup/>}></Route>
            <Route path='/books'element={<Books/>}></Route>
            <Route path='/add'element={<Add/>}></Route>
            <Route path='/update' element={<Update/>}></Route>
            <Route path='/futurebooks' element={<Futurebooks/>}></Route>
          </Routes>
          </BrowserRouter>
        </div>
  );
}

export default App;
