import { Routes, Route } from "react-router-dom";
import { Edit, Agencies } from "./components";

export const AgenciesFeature = () => (
  <Routes>
    <Route index element={<Agencies />} />
    <Route path=":entityId" element={<Edit />} />
  </Routes>
);
