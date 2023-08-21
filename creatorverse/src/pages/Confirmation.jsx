import { Typography, Button, Grid, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import Link from "@mui/material/Link";
import { Outlet } from "react-router-dom";

const Confirmation = () => {
  const { crudOperation } = useParams();

  return (
    <Box
      component="div"
      sx={{
        textAlign: "center",
        width: "70%",
        margin: "5rem auto",
      }}
    >
      <Typography variant="h3" component="h1">
        {`You have successfully ${crudOperation} your CreatorVerse creator!`}
      </Typography>
      <Grid
        container
        justifyContent="center"
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ padding: "5rem" }}
      >
        <Grid item xs={6} sm={6} md={6}>
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
              Add New Creator
            </Button>
          </Link>
        </Grid>
        <Grid item xs={6} sm={6} md={6}>
          <Link href="/all" underline="none">
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
              View All Creators
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Outlet />
    </Box>
  );
};

export default Confirmation;
