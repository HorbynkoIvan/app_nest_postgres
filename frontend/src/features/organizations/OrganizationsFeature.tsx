import { Routes, Route } from "react-router-dom";
import { Orgs } from "./components";

export const OrganizationsFeature = () => (
  <Routes>
    <Route index element={<Orgs />} />
    <Route path="create" element={<h1>OrgCreate</h1>} />
    <Route path=":orgId/edit" element={<h1>OrgEdit</h1>} />
  </Routes>
);
