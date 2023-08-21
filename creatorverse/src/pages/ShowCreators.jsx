import { useEffect, useState } from "react";
import { supabase } from "../api/client";
import { Grid, Typography } from "@mui/material";
import CreatorCard from "../components/CreatorCard";

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data, error } = await supabase.from("creators").select("*");
        if (error) {
          throw error;
        }
        setCreators(data);
      } catch (error) {
        console.error("Error fetching creators:", error);
      }
    };

    fetchCreators();
  }, []);

  return (
    <>
      <Typography
        variant="h3"
        style={{
          textAlign: "center",
        }}
      >
        All Creators.
        <Typography
          style={{
            textAlign: "center",
            padding: "1rem",
          }}
        >
          Explore your creators!
        </Typography>
      </Typography>
      <Grid container spacing={2} padding={2}>
        {creators.map((creator) => (
          <Grid item key={creator.id}>
            <CreatorCard key={creator.id} creator={creator} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ShowCreators;
