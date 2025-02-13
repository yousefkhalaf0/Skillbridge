import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const ImageUploader = ({ navHeight }) => {
  const [imageUrls, setImageUrls] = useState(["", "", ""]); // Always 3 slots
  const [currentUrl, setCurrentUrl] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleAddOrUpdateImage = () => {
    if (!currentUrl) return;

    setImageUrls((prevUrls) => {
      const updatedUrls = [...prevUrls];
      if (selectedIndex !== null) {
        updatedUrls[selectedIndex] = currentUrl;
      }
      return updatedUrls;
    });

    setSelectedIndex(null);
    setCurrentUrl("");
  };

  const handleImageSelect = (index) => {
    setSelectedIndex(index);
    setCurrentUrl(imageUrls[index]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        justifyItems: "center",
        flexDirection: "column",
        gap: 2,
        p: 3,
        borderLeft: { lg: "1px solid white" },
      }}
    >
      {/* Selected Image Display */}
      <Box
        sx={{
          width: 300,
          height: 300,
          borderRadius: 2,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
          bgcolor: "#FFF",
        }}
      >
        {selectedIndex !== null && imageUrls[selectedIndex] ? (
          <img
            src={imageUrls[selectedIndex]}
            alt="selected"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <AddPhotoAlternateIcon
            sx={{ fontSize: 60, color: "action.active" }}
          />
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Image Slots (Always 3) */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {imageUrls.map((url, index) => (
            <Box
              key={index}
              sx={{
                width: 100,
                height: 100,
                border:
                  selectedIndex === index
                    ? "2px solid black"
                    : "1px solid grey",
                borderRadius: 2,
                overflow: "hidden",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "transparent",
              }}
              onClick={() => handleImageSelect(index)}
            >
              {url ? (
                <img
                  src={url}
                  alt={`uploaded-${index}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <AddPhotoAlternateIcon sx={{ fontSize: 40, color: "grey" }} />
              )}
            </Box>
          ))}
        </Box>

        {/* URL Input and Add/Update Button */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter image URL"
            value={currentUrl}
            size="small"
            onChange={(e) => setCurrentUrl(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleAddOrUpdateImage}
            disabled={!currentUrl || selectedIndex === null}
          >
            {imageUrls[selectedIndex] ? "Update" : "Add"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageUploader;
