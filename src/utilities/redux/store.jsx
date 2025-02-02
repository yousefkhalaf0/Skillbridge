import { configureStore, createSlice } from "@reduxjs/toolkit";

// Slice for theme management
const themeSlice = createSlice({
    name: "handleTheme",
    initialState: "light",
    reducers: {
        toggleTheme: (state) => {
            return state === "light" ? "dark" : "light";
        },
    },
});

// Slice for navbar management
const navbarSlice = createSlice({
    name: "navbar",
    initialState: {
        activeButton: "Home",
        anchorEl: null,
    },
    reducers: {
        setActiveButton: (state, action) => {
            state.activeButton = action.payload;
        },
        setAnchorEl: (state, action) => {
            state.anchorEl = action.payload;
        },
    },
});

// Slice for language management
const languageSlice = createSlice({
    name: "language",
    initialState: "en",
    reducers: {
        toggleLanguage: (state) => {
            return state === "en" ? "ar" : "en";
        },
    },
});


// Exporting actions
export const { toggleTheme } = themeSlice.actions;
export const { setActiveButton, setAnchorEl } = navbarSlice.actions;
export const { toggleLanguage } = languageSlice.actions;

// Exporting reducers
const store = configureStore({
    reducer: {
        themeReducer: themeSlice.reducer,
        navbarReducer: navbarSlice.reducer,
        languageReducer: languageSlice.reducer,
    },
});

export default store;