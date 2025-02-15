import { Routes, Route } from "react-router-dom";

import FilmsListPage from "../pages/FilmsList/page";
import PlansPage from "../pages/Plans/page";

const RoutesList = () => {
  return (
    <Routes>
      <Route path="/" element={<FilmsListPage />} />
      <Route path="/plans" element={<PlansPage />} />
    </Routes>
  );
};

export default RoutesList;
