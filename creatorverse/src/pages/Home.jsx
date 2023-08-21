import { Typography, Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StackedHomeCards from "../components/StackedHomeCards";
import Link from "@mui/material/Link";
import { Outlet } from "react-router-dom";

const Home = () => {
  const theme = useTheme();

  return (
    <div>
      <Typography
        variant="h3"
        style={{
          textAlign: "center",
        }}
      >
        Welcome to CreatorVerse!
        <Typography
          style={{
            color: theme.palette.text.secondary,
            textAlign: "center",
            padding: "1rem",
          }}
        >
          Dive into the Creatorverse, where creativity knows no bounds!
        </Typography>
      </Typography>
      <Typography
        variant="body1"
        style={{
          color: theme.palette.text.secondary,
          textAlign: "center",
          padding: "1rem",
        }}
      >
        This is your personal hub for managing and discovering inspiring content
        creators.
      </Typography>
      <StackedHomeCards />
      <Grid container justifyContent="center">
        <Grid item>
          <Link href="/new" underline="none">
            <Button
              variant="outlined"
              sx={{
                borderColor: "#81c784",
                textTransform: "none",
                color: "#232323",
                "&:hover": {
                  backgroundColor: "#28a745",
                  color: "#fff",
                },
              }}
            >
              Add Creator Now!
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Outlet />
    </div>
  );
};

export default Home;
