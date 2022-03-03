import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Book, Category, Favorite, Home, } from './pages'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":name/:categoryId" element={<Category />}></Route>
        <Route path=":category/:id/:page" element={<Book />}></Route>
        <Route path="favorite" element={<Favorite />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
