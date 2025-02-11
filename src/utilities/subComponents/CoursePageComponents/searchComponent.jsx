import React, { useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "../../muiComponents.js";
import "./componentsStyle/searchComponent.css";

export default function SearchComponent({ onSearch, onFilter, filterOptions }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    onFilter(value);
  };

  return (
    <Box
      sx={{
        marginBottom: 3,
        display: "flex",
        gap: 2,
        justifyContent: "flex-end",
      }}
    >
      <TextField
        size="small"
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <FormControl variant="outlined" sx={{ minWidth: 100 }}>
        <InputLabel size="small">Level</InputLabel>
        <Select
          size="small"
          value={filter}
          onChange={handleFilterChange}
          label="Level"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {filterOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
