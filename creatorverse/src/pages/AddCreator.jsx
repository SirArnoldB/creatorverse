import { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useNavigate } from "react-router-dom";
import { supabase } from "../api/client";

const AddCreator = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [youtube, setYoutube] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const navigateTo = useNavigate();
  const [navigateToConfirmation, setNavigateToConfirmation] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [crudOperation, setCrudOperation] = useState("created");

  useEffect(() => {
    if (navigateToConfirmation) {
      navigateTo(`/confirmation/${crudOperation}`);
    }
  }, [navigateToConfirmation, navigateTo, crudOperation]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("creators").insert([
      {
        name: name,
        description: description,
        imageURL: image,
        youtube: youtube,
        twitter: twitter,
        instagram: instagram,
      },
    ]);

    if (error) {
      alert("Error creating new Creator: ", error.message);
    } else {
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
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Name"
              value={name}
              variant="filled"
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image"
              value={image}
              variant="filled"
              onChange={(e) => setImage(e.target.value)}
              helperText="Provide a link to an image of your creator. Be sure to include the http://"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Description"
              multiline
              value={description}
              variant="filled"
              onChange={(e) => setDescription(e.target.value)}
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
              label="YouTube"
              value={youtube}
              variant="filled"
              onChange={(e) => setYoutube(e.target.value)}
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
              label="Twitter"
              value={twitter}
              variant="filled"
              onChange={(e) => setTwitter(e.target.value)}
              helperText="The creator's Twitter handle (without the @)"
              InputProps={{
                endAdornment: (
                  <TwitterIcon sx={{ color: "blue", marginRight: "0.5rem" }} />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Instagram"
              value={instagram}
              variant="filled"
              onChange={(e) => setInstagram(e.target.value)}
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
          <Grid item xs={12}>
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
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddCreator;
