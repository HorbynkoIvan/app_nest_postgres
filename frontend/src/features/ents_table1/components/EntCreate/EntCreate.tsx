import { Divider } from "@mui/material";
import { Form, Header } from "./views";
import { PaperWrapper, BoxScrolled } from "common/ui";
import { palette } from "theme";

export const EntCreate = (): JSX.Element => (
  <PaperWrapper>
    <Header />

    <Divider sx={{ borderColor: palette.grey[200] }} />

    <BoxScrolled height="calc(100% - 70px)" withScrollBar>
      <Form />
    </BoxScrolled>
  </PaperWrapper>
);
