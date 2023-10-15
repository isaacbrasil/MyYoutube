import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar, VideoUploader } from "./";
import { Add } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        setVideos((prevVideos) => [...prevVideos, arrayBuffer]);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1.5, color: "#fff" }}
        >
          Copyright © MyYoutube
        </Typography>
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <IconButton
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ color: "white", display: "flex", justifyContent: "center" }}
        >
          <Add />
          <VisuallyHiddenInput type="file" onChange={handleVideoChange} />
        </IconButton>

        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#FC1503" }}>Videos</span>
        </Typography>
        <Typography variant="h4" sx={{ mt: 1.5, color: "#fff" }}>
          {videos?.length} vídeos carregados
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
