import React from "react";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import Detail from "./modules/Detail/pages/Detail";
import HomePage from "./modules/Home/pages/HomePage";
import News from "./modules/News/pages/News";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./modules/Auth/pages/Login";
import Register from "./modules/Auth/pages/Register";
import PrivateRoute from "./modules/Router/PrivateRoute";
import Ticket from "./modules/Ticket/Pages/Ticket";
import Account from "./modules/Account/pages/Account";
import AdminRoute from "./modules/Router/AdminRoute";
import AdminMovies from "./modules/Admin/pages/AdminMovies";
import AdminUsers from "./modules/Admin/pages/AdminUsers";
import CreateMovie from "./modules/Admin/components/Movie/CreateMovie";
import EditMovie from "./modules/Admin/components/Movie/EditMovie";
import CreateMovieShowtimes from "./modules/Admin/components/Movie/CreateMovieShowtimes";

import CreateUser from "./modules/Admin/components/User/CreateUser";
import EditUser from "./modules/Admin/components/User/EditUser";
import NotFoundPage from "./components/NotFoundPage";
import "./styles/styleLayout.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeTemplate />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/news" element={<News />} />
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/ticket/:ticketId" element={<PrivateRoute />}>
          <Route index element={<Ticket />} />
        </Route>

        <Route path="/account" element={<PrivateRoute />}>
          <Route path="/account" element={<HomeTemplate />}>
            <Route index element={<Account />} />
          </Route>
        </Route>

        <Route path="/admin" element={<AdminRoute />}>
          <Route path="/admin" element={<AdminTemplate />}>
            <Route index element={<AdminUsers />} />
            <Route path="movies" element={<AdminMovies />} />
            <Route path="movies/create" element={<CreateMovie />} />
            <Route path="movies/edit/:id" element={<EditMovie />} />
            <Route
              path="movies/showtimes/create/:id"
              element={<CreateMovieShowtimes />}
            />

            <Route path="users" element={<AdminUsers />} />
            <Route path="users/create" element={<CreateUser />} />
            <Route path="users/edit/:id" element={<EditUser />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
