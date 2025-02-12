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
import en from "../../localization/en.js";
import ar from "../../localization/ar.js";
import { useSelector } from "react-redux";

export default function SearchComponent({ onSearch, onFilter, filterOptions }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const lang = useSelector((state) => state.languageReducer);

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
        label={
          lang == "en"
            ? en.search.searchPlaceholder
            : ar.search.searchPlaceholder
        }
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <FormControl variant="outlined" sx={{ minWidth: 100 }}>
        <InputLabel size="small">
          {lang == "en" ? en.search.levelLabel : ar.search.levelLabel}
        </InputLabel>
        <Select
          size="small"
          value={filter}
          onChange={handleFilterChange}
          label="Level"
        >
          <MenuItem value="">
            <em>
              {lang == "en" ? en.search.noneOption : ar.search.noneOption}
            </em>
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
