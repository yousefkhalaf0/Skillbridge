import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

export default function ImageDropzone() {
  const [images, setImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setImages((prevImages) => [...prevImages, ...newImages]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      {/* Dropzone Area */}
      <Box
        {...getRootProps()}
        sx={{
          width: 300,
          height: 200,
          bgcolor: "#fff",
          border: "2px dashed #ccc",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <EmailIcon sx={{ fontSize: 40, color: "#666" }} />
        <Typography variant="body2" sx={{ color: "#666" }}>
          Drag the course photos
        </Typography>
      </Box>

      {/* Display Uploaded Images */}
      <Box sx={{ display: "flex", gap: 2 }}>
        {images.map((file, index) => (
          <Card
            key={index}
            sx={{
              width: 80,
              height: 80,
              borderRadius: 2,
              overflow: "hidden",
              border: index === 0 ? "2px solid black" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardMedia component="img" image={file.preview} alt="Uploaded" sx={{ width: "100%", height: "100%" }} />
          </Card>
        ))}
      </Box>
    </Box>
  );
}
