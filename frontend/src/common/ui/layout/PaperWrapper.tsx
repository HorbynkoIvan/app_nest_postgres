import { Paper, PaperProps, styled } from "@mui/material";

type Props = PaperProps;

export const PaperWrapper = styled((props: Props) => <Paper elevation={0} {...props} />)(() => ({
  height: "100%",
  boxShadow: "0px 6px 8px rgba(94, 129, 170, 0.08)",
  borderRadius: "12px",
  background: "#ffffff",
  margin: "0 10px",
  padding: "25px 35px",
  overflow: "hidden",
}));
