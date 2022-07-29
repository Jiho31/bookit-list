import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Library from "routes/Library";
import Notes from "routes/Notes";
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
        <Route path="/library" element={<Library />}></Route>
        <Route path="/notes" element={<Notes />} userInfo={userInfo}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default React.memo(Router);
