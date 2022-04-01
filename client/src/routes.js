import React from "react";
import {Navigate, Route,Routes} from "react-router-dom";

import { LinksPage } from "./pages/LinksPage";
import { CreatePage } from "./pages/CreatePage";
import { DetailsPage } from "./pages/DetailsPage";
import { AuthPage } from "./pages/AuthPage";

export const useRoutes = (isAuth) => {
  if (isAuth) {
    return (
      <Routes>
        <Route path="/links" exact element={<LinksPage />} />
        <Route path="/create" element={<CreatePage/>} exact />
        <Route path="/detail/:id" element={<DetailsPage />} exact />
        <Route path="*" element={<Navigate to='/create'/>} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" exact element={<AuthPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};
