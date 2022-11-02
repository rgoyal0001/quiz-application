import React from 'react';
import { Route, Routes,createBrowserRouter,RouterProvider } from 'react-router-dom';
import LoginUser from './pages/LogIn/loginUser';
import LoginAdmin from './pages/LogIn/loginAdmin';
import RegisterUser from './pages/Register/RegisterUser';
import RegisterAdmin from './pages/Register/RegisterAdmin';

import Navbar from './components/Navbar';

import Main from './components/Main'
import Quiz from './components/Quiz'
import Result from './components/Result'
// const router = createBrowserRouter([

//   {
//     path : '/',
//     element : <Navbar/>
//   },
//   {
//     path : '/main',
//     element : <Main></Main>
//   },
//   {
//     path : '/quiz',
//     element : <Quiz />
//   },
//   {
//     path : '/result',
//     element : <Result />
//   },
//   {
//     path : '/loginUser',
//     element : <LoginUser />
//   },
//   {
//     path : '/loginAdmin',
//     element : <LoginAdmin />
//   },
//   {
//     path : '/registerUser',
//     element : <RegisterUser />
//   },
//   {
//     path : '/registerAdmin',
//     element : <RegisterAdmin />
//   },
// ])
// function App() {
//   return (<>
    
//     <RouterProvider router={router} />
//   </>
//   );
// }
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/loginUser' element={<LoginUser/>}></Route>
        <Route path='/loginAdmin' element={<LoginAdmin/>}></Route>
        <Route path='/registerUser' element={<RegisterUser/>}></Route>
        <Route path='/registerAdmin' element={<RegisterAdmin/>}></Route>
        <Route path='/home' element={<Main/>}></Route>
        <Route path='/quiz' element={<Quiz/>}></Route>
        <Route path='/result' element={<Result/>}></Route>
      </Routes>
    </div>
  );
}

export default App;



