import { Routes, Route } from "react-router-dom";
import { OrgCreate, OrgEdit, Orgs } from "./components";

export const OrganizationsFeature = () => (
  <Routes>
    <Route index element={<Orgs />} />
    <Route path="create" element={<OrgCreate />} />
    <Route path=":orgId/edit" element={<OrgEdit />} />
  </Routes>
);
