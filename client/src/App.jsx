import React from 'react';
import Headers from './components/Headers';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { useSelector } from 'react-redux';

// import Home from './Routes/Home';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AddProduct from './components/AddProduct';

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);

  return (
    <>
      <header>
        <Headers />
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {isLoggedIn && <Route path="/user" element={<Home />} />}
        </Routes>
      </main>
    </>
  );
}

export default App;
