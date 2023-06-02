import { Routes, Route } from "react-router-dom";
import { Ents, EntCreate, EntEdit } from "./components";

export const EntsFeature = () => (
  <Routes>
    <Route index element={<Ents />} />
    <Route path="create" element={<EntCreate />} />
    <Route path=":entId/edit" element={<EntEdit />} />
  </Routes>
);
