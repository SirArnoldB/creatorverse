import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Card,
  CardMedia,
  Grid,
  CircularProgress,
  Typography,
  CardHeader,
  Chip,
  Link,
  Box,
  CardContent,
  Button,
} from "@mui/material";
import { getCreator } from "../utils/getCreator";
import { supabase } from "../api/client";

const ViewCreator = () => {
  const [creator, setCreator] = useState({});
  const { creatorId } = useParams();
  const [crudOperation, setCrudOperation] = useState("");
  const [navigateToConfirmation, setNavigateToConfirmation] = useState(false);

  const navigateTo = useNavigate();

  useEffect(() => {
    getCreator(creatorId).then((creator) => {
      setCreator(creator);
    });
  }, [creatorId]);

  useEffect(() => {
    if (navigateToConfirmation) {
      navigateTo(`/confirmation/${crudOperation}`);
    }
  }, [navigateToConfirmation, navigateTo, crudOperation]);

  const handleDelete = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("creators")
      .delete()
      .eq("id", creatorId);

    if (error) {
      alert("Error deleting ImmuneCrewMate!");
    } else {
      setCrudOperation("deleted");
      setNavigateToConfirmation(true);
    }
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        width: "70%",
        margin: "5rem auto",
      }}
    >
      {creator ? (
        <Card
          sx={{
            width: 800,
            height: 900,
            margin: "auto",
            marginTop: "2rem",
          }}
        >
          <CardHeader
            sx={{
              backgroundColor: "#d6f5d6",
              border: "1px solid #28a745",
              textAlign: "left",
            }}
            avatar={
              <Avatar aria-label="Fact" src={creator.imageURL}>
                {creator.name}
              </Avatar>
            }
            title={creator.name}
          />
          <CardMedia
            sx={{
              objectFit: "fill",
              display: "inline",
            }}
            image={
              creator.imageURL
                ? creator.imageURL
                : "/src/assets/images/default-creator-verse.jpeg"
            }
            title={`Creator: ${creator.name}`}
            component={"img"}
          />
          <CardContent
            sx={{
              display: "grid",
            }}
          >
            <Chip
              label={`Creator Details`}
              variant="outlined"
              sx={{
                backgroundColor: "#28a745",
                color: "#d6f5d6",
                "&:hover": {
                  backgroundColor: "#28a745",
                  color: "#fff",
                },
              }}
            />
            <Typography sx={{ paddingTop: "2rem" }}>
              {creator.description}
            </Typography>
          </CardContent>
          <Grid
            container
            justifyContent="center"
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{ padding: "5rem" }}
          >
            <Grid item xs={6} sm={6} md={6}>
              <Link href={`/all/${creator.id}/edit`} underline="none">
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
                  {`Edit ${creator.name}`}
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6} sm={6} md={6}>
              <Button
                onClick={handleDelete}
                variant="outlined"
                type="button"
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
                Delete
              </Button>
            </Grid>
          </Grid>
        </Card>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default ViewCreator;
