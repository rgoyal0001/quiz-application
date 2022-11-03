import React from 'react';
import { Route, Routes,createBrowserRouter,RouterProvider } from 'react-router-dom';
import LoginUser from './pages/LogIn/loginUser';
import LoginAdmin from './pages/LogIn/loginAdmin';
import RegisterUser from './pages/Register/RegisterUser';
import RegisterAdmin from './pages/Register/RegisterAdmin';

import Navbar from './components/Navbar';

import Main from './components/Main'
import CreateQuiz from './components/CreateQuiz'
import Quiz from './components/Quiz'
import Result from './components/Result'
import {Home} from './components/Home'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/loginUser' element={<LoginUser/>}></Route>
        <Route path='/loginAdmin' element={<LoginAdmin/>}></Route>
        <Route path='/registerUser' element={<RegisterUser/>}></Route>
        <Route path='/registerAdmin' element={<RegisterAdmin/>}></Route>
        <Route path='/main' element={<Main/>}></Route>
        <Route path='/createQuiz' element={<CreateQuiz/>}></Route>
        <Route path='/quiz' element={<Quiz/>}></Route>
        <Route path='/result' element={<Result/>}></Route>
        <Route path='/' element={<Home/>}></Route>
      </Routes>
    </div>
  );
}

export default App;



