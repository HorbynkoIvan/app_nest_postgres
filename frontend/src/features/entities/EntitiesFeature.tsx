import { Routes, Route } from "react-router-dom";
import { Edit, Entities } from "./components";

// ToDo Table example where all table functionality implemented on front side
export const EntitiesFeature = () => (
  <Routes>
    <Route index element={<Entities />} />
    <Route path=":entityId" element={<Edit />} />
  </Routes>
);
