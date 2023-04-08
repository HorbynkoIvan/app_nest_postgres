import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Router } from "routes";

export default function App(): JSX.Element {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}
