import React from "react";
import { Box } from "../../utilities/muiComponents.js";
import { useSelector } from "react-redux";

export default function NotFoundPage() {
  const lang = useSelector((state) => state.languageReducer);

  return (
    <Box align="center" sx={{ my: 40 }}>
      {lang == "en"
        ? "404 The requested page was not found."
        : "404 لم يتم العثور على الصفحة المطلوبة."}
    </Box>
  );
}
