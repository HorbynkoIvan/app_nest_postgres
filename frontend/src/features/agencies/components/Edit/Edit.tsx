import { Divider } from "@mui/material";
import { PaperWrapper } from "common/ui";
import { Form, Header } from "./views";
import { palette } from "theme";
import { useParams } from "react-router-dom";

export const Edit = (): JSX.Element => {
  const { entityId } = useParams();

  return (
    <PaperWrapper>
      <Header name={`Brooklyn ${entityId}`} />
      <Divider sx={{ borderColor: palette.grey[200] }} />

      <Form />
    </PaperWrapper>
  );
};
