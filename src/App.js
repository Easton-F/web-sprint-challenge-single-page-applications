import React from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Form from './Components/Form';

const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <nav>
          <Link to="/">Home Page</Link>&nbsp;
          <Link to="pizza" id="order-pizza">DIY Pizza</Link>
      </nav>
      <Routes>
          <Route path="pizza" element={<Form />}/>
      </Routes>
    </>
  );
};
export default App;
