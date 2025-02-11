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
    showScroll: false,
  },
  reducers: {
    setShowScroll: (state, action) => {
      state.showScroll = action.payload;
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

// Slice for course data management
const courseSlice = createSlice({
  name: "course",
  initialState: {
    courses: [],
    selectedCourse: null,
    loading: false,
    error: null,
  },
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});


const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null, // Stores user data
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    logoutUser: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
    },
    setUserLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});
const userCourseSlice = createSlice({
  name: "userCourses",
  initialState: {
    userCourses: [],
    loading: false,
    error: null,
  },
  reducers: {
    setUserCourses: (state, action) => {
      state.userCourses = action.payload;
      state.loading = false;
      state.error = null;
    },
    setUserCoursesLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUserCoursesError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const adminWatchLaterSlice = createSlice({
  name: "adminWatchLater",
  initialState: {
    watchLaterCourses: [],
    loading: false,
    error: null,
  },
  reducers: {
    setAdminWatchLaterCourses: (state, action) => {
      state.watchLaterCourses = action.payload;
      state.loading = false;
      state.error = null;
    },
    setAdminWatchLaterLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAdminWatchLaterError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Exporting actions
export const { toggleTheme } = themeSlice.actions;
export const { setShowScroll } = scrollSlice.actions;
export const { setActiveButton, setAnchorEl } = navbarSlice.actions;
export const { toggleLanguage } = languageSlice.actions;
export const { toggleShowAllBenefits } = showAllBenefitsSlice.actions;
export const { toggleShowAllTestimonials } = showAllTestimonialsSlice.actions;
export const { setCourses, setSelectedCourse, setLoading, setError } =
  courseSlice.actions;
export const { setUserCourses, setUserCoursesLoading, setUserCoursesError } =
  userCourseSlice.actions;
export const {
  setAdminWatchLaterCourses,
  setAdminWatchLaterLoading,
  setAdminWatchLaterError,
} = adminWatchLaterSlice.actions;
export const { setUser, logoutUser, setUserLoading, setUserError } =
  userSlice.actions;
// Exporting reducers
const store = configureStore({
  reducer: {
    themeReducer: themeSlice.reducer,
    scrollReducer: scrollSlice.reducer,
    navbarReducer: navbarSlice.reducer,
    languageReducer: languageSlice.reducer,
    showAllBenefitsReducer: showAllBenefitsSlice.reducer,
    showAllTestimonialsReducer: showAllTestimonialsSlice.reducer,
    courseReducer: courseSlice.reducer,
    userCourseReducer: userCourseSlice.reducer,
    adminWatchLaterReducer: adminWatchLaterSlice.reducer,
    userReducer: userSlice.reducer, 
  },
});

export default store;
