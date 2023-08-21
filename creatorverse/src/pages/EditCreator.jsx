import { useState, useEffect } from "react";
import { supabase } from "../api/client";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getCreator } from "../utils/getCreator";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import {
  CircularProgress,
  TextField,
  Button,
  Grid,
  Box,
  Typography,
} from "@mui/material";

const EditCreator = () => {
  const [creator, setCreator] = useState({});
  const [crudOperation, setCrudOperation] = useState("");
  const [navigateToConfirmation, setNavigateToConfirmation] = useState(false);
  const [columnsToUpdate, setColumnsToUpdate] = useState({});

  const navigateTo = useNavigate();
  const { creatorId } = useParams();

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

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (Object.keys(columnsToUpdate).length !== 0) {
      const { error } = await supabase
        .from("creators")
        .update([columnsToUpdate])
        .eq("id", creatorId);

      if (error) {
        alert("Error creating new Creator!");
      } else {
        setCrudOperation("updated");
        setNavigateToConfirmation(true);
      }
    } else {
      alert("You must update at least one field.");
    }
  };

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
        <form onSubmit={handleUpdate}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Name"
                defaultValue={creator.name}
                multiline
                variant="filled"
                onChange={(e) =>
                  setColumnsToUpdate({
                    ...columnsToUpdate,
                    name: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image"
                defaultValue={creator.imageURL}
                multiline
                variant="filled"
                onChange={(e) =>
                  setColumnsToUpdate({
                    ...columnsToUpdate,
                    imageURL: e.target.value,
                  })
                }
                helperText="Provide a link to an image of your creator. Be sure to include the http://"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Description"
                defaultValue={creator.description}
                multiline
                variant="filled"
                onChange={(e) =>
                  setColumnsToUpdate({
                    ...columnsToUpdate,
                    description: e.target.value,
                  })
                }
                helperText="Provide a description of the creator. Who are they? What makes them interesting?"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">SOCIAL MEDIA LINKS</Typography>
              <Typography variant="caption">
                {`Provide a least one of the creator's social media links.`}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                label="YouTube"
                defaultValue={creator.youtube}
                variant="filled"
                onChange={(e) =>
                  setColumnsToUpdate({
                    ...columnsToUpdate,
                    youtube: e.target.value,
                  })
                }
                helperText="The creator's YouTube handle (without the @)"
                InputProps={{
                  endAdornment: (
                    <YouTubeIcon sx={{ color: "red", marginRight: "0.5rem" }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                label="Twitter"
                defaultValue={creator.twitter}
                variant="filled"
                onChange={(e) =>
                  setColumnsToUpdate({
                    ...columnsToUpdate,
                    twitter: e.target.value,
                  })
                }
                helperText="The creator's Twitter handle (without the @)"
                InputProps={{
                  endAdornment: (
                    <TwitterIcon
                      sx={{ color: "blue", marginRight: "0.5rem" }}
                    />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                label="Instagram"
                defaultValue={creator.instagram}
                variant="filled"
                onChange={(e) =>
                  setColumnsToUpdate({
                    ...columnsToUpdate,
                    instagram: e.target.value,
                  })
                }
                helperText="The creator's Instagram handle (without the @)"
                InputProps={{
                  endAdornment: (
                    <InstagramIcon
                      sx={{ color: "purple", marginRight: "0.5rem" }}
                    />
                  ),
                }}
              />
            </Grid>
            <Grid
              container
              justifyContent="center"
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{ padding: "5rem" }}
            >
              <Grid item xs={6} sm={6} md={6}>
                <Button
                  type="submit"
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
                  Update
                </Button>
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
          </Grid>
        </form>
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default EditCreator;
