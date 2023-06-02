import { Routes, Route } from "react-router-dom";
import { Edit, Ents } from "./components";

export const EntsTable1Feature = () => (
  <Routes>
    <Route index element={<Ents />} />
    <Route path=":entityId" element={<Edit />} />
  </Routes>
);
