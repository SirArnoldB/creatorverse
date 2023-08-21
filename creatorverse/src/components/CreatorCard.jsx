import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  CardActions,
  Button,
  Link,
} from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PropTypes from "prop-types";

const CreatorCard = ({ creator }) => {
  const { id, name, description, imageURL, youtube, twitter, instagram } =
    creator;
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const shortDescription =
    description?.length > 100
      ? description.split(" ").slice(0, 100).join(" ") + "..."
      : "";

  return (
    <Card sx={{ width: 345 }}>
      <CardMedia
        component="img"
        height="150"
        image={imageURL || "/src/assets/images/default-creator-verse.jpeg"}
        alt={name}
        sx={{ objectFit: "fill" }}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {shortDescription?.length > 0
            ? expanded
              ? description
              : shortDescription
            : description}
        </Typography>
        {shortDescription?.length > 0 && (
          <Button color="primary" onClick={handleExpandClick}>
            {expanded ? "Show Less" : "Show More"}
          </Button>
        )}
      </CardContent>
      <CardActions
        sx={{
          paddingLeft: "1rem",
          paddingRight: "1rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Link href={`/all/${id}`}>
            <IconButton edge="start" color="inherit" aria-label="view">
              <VisibilityIcon />
            </IconButton>
          </Link>
          <Link href={`/all/${id}/edit`}>
            <IconButton edge="start" color="inherit" aria-label="edit">
              <EditIcon />
            </IconButton>
          </Link>
        </div>
        <div>
          {youtube && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="youtube"
              href={`https://www.youtube.com/${youtube}`}
              target="_blank"
            >
              <YouTubeIcon />
            </IconButton>
          )}
          {twitter && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="twitter"
              href={`https://www.twitter.com/${twitter}`}
              target="_blank"
            >
              <TwitterIcon />
            </IconButton>
          )}
          {instagram && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="instagram"
              href={`https://www.instagram.com/${instagram}`}
              target="_blank"
            >
              <InstagramIcon />
            </IconButton>
          )}
        </div>
      </CardActions>
    </Card>
  );
};

CreatorCard.propTypes = {
  creator: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    youtube: PropTypes.string.isRequired,
    twitter: PropTypes.string.isRequired,
    instagram: PropTypes.string.isRequired,
  }).isRequired,
};

export default CreatorCard;
