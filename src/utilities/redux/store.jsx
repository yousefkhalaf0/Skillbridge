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

// Slice for scroll visibility
const scrollSlice = createSlice({
    name: "scroll",
    initialState: {
        showScroll: false
    },
    reducers: {
        setShowScroll: (state, action) => {
            state.showScroll = action.payload;
        }
    }
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

// Slice for showing all benefits
const showAllBenefitsSlice = createSlice({
    name: "showAllBenefits",
    initialState: false,
    reducers: {
        toggleShowAllBenefits: (state) => !state,
    },
});

// Slice for showing all testimonials
const showAllTestimonialsSlice = createSlice({
    name: "showAllTestimonials",
    initialState: false,
    reducers: {
        toggleShowAllTestimonials: (state) => !state,
    },
});

// Exporting actions
export const { toggleTheme } = themeSlice.actions;
export const { setShowScroll } = scrollSlice.actions;
export const { setActiveButton, setAnchorEl } = navbarSlice.actions;
export const { toggleLanguage } = languageSlice.actions;
export const { toggleShowAllBenefits } = showAllBenefitsSlice.actions;
export const { toggleShowAllTestimonials } = showAllTestimonialsSlice.actions;

// Exporting reducers
const store = configureStore({
    reducer: {
        themeReducer: themeSlice.reducer,
        scrollReducer: scrollSlice.reducer,
        navbarReducer: navbarSlice.reducer,
        languageReducer: languageSlice.reducer,
        showAllBenefitsReducer: showAllBenefitsSlice.reducer,
        showAllTestimonialsReducer: showAllTestimonialsSlice.reducer,
    },
});

export default store;