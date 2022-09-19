import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDetail from "routes/BookDetail";
import Library from "routes/Library";
import Memos from "routes/Memos";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

function Router({ isLoggedIn, userInfo }) {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Home userInfo={userInfo} />}></Route>
        ) : (
          <Route path="/" element={<Auth />}></Route>
        )}
        <Route
          exact
          path="/library"
          element={<Library userInfo={userInfo} />}
        ></Route>
        <Route
          path="/library/:bookshelfID/:bookID"
          element={<BookDetail userInfo={userInfo} />}
        ></Route>
        <Route path="/memos" element={<Memos userInfo={userInfo} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default React.memo(Router);
