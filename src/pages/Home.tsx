import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/devicelist");
        }}>
        Device List
      </Button>
    </Stack>
  );
};
