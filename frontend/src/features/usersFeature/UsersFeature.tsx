import { Route, Routes } from "react-router-dom";
import { Users, UserCreate, UserEdit } from "./components";

export const UsersFeature = () => (
  <Routes>
    <Route index element={<Users />} />
    <Route path="create" element={<UserCreate />} />
    <Route path=":userId/edit" element={<UserEdit />} />
  </Routes>
);
