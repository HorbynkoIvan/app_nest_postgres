import { Divider } from "@mui/material";
import { PaperWrapper, BoxScrolled } from "common/ui";
import { Form, Header } from "./views";
import { palette } from "theme";
import { useEntAPI } from "./hooks";
import { Loader } from "common/components";

export const EntEdit = (): JSX.Element => {
  const { ent, loading } = useEntAPI();

  if (loading) return <Loader />;

  return (
    <PaperWrapper>
      <Header name={ent.title} id={ent.id} />

      <Divider sx={{ borderColor: palette.grey[200] }} />

      <BoxScrolled height="calc(100% - 70px)" withScrollBar>
        <Form ent={ent} />
      </BoxScrolled>
    </PaperWrapper>
  );
};
