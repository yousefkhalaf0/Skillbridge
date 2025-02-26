import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
  Checkbox,
  FormControlLabel,
  VisibilityOff,
  Visibility,
  ArrowOutwardIcon,
} from "../../muiComponents.js";
import { useDispatch, useSelector } from "react-redux";
import "./componentsStyle/signInForm.css";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
import { auth, checkIfAdmin, fetchUserData } from "../../firebase.js";
import en from "../../localization/en.js";
import ar from "../../localization/ar.js";
import { setUser } from "../../redux/store.jsx";
export default function SignInForm() {
  const theme = useSelector((state) => state.themeReducer);
  const lang = useSelector((state) => state.languageReducer);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  console.log("Email:", email);
  console.log("Password:", password);
  console.log("Remember Me:", rememberMe);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setSnackbarMessage(
        lang == "en" ? en.signIn.loginSuccess : ar.signIn.loginSuccess
      );

      const user = userCredential.user;
      const isAdmin = await checkIfAdmin(user.uid);
      const userData = await fetchUserData(user.uid, isAdmin);

      // Store user data in local storage
      localStorage.setItem("userData", JSON.stringify(userData));

      dispatch(setUser(userData)); // Update Redux store
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setSnackbarMessage(
        lang == "en" ? en.signIn.loginError : en.signIn.loginError
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSignUpClick = () => {
    console.log("Redirect to sign-up page or open sign-up modal");
    navigate("/signUp");
  };

  return (
    <Box
      className={`${theme}SignInFormContainer`}
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        padding: "30px",
      }}
    >
      <Typography variant="h4" className="signInFormTitle" gutterBottom>
        {lang == "en" ? en.signIn.login : ar.signIn.login}
      </Typography>
      <Typography variant="body1" className="signInFormSubTitle" gutterBottom>
        {lang == "en" ? en.signIn.welcomeBack : ar.signIn.welcomeBack}
      </Typography>

      {/* Email Field */}
      <Typography variant="body1" className="fieldText" gutterBottom>
        {lang == "en" ? en.signIn.email : ar.signIn.email}
      </Typography>
      <TextField
        fullWidth
        label={lang == "en" ? en.signIn.enterEmail : ar.signIn.enterEmail}
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!emailError}
        helperText={emailError}
        sx={{
          mb: 3,
          borderRadius: "8px",
        }}
      />

      {/* Password Field */}
      <Typography variant="body1" className="fieldText" gutterBottom>
        {lang == "en" ? en.signIn.password : ar.signIn.password}
      </Typography>
      <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
        <InputLabel htmlFor="password">
          {lang == "en" ? en.signIn.enterPassword : ar.signIn.enterPassword}
        </InputLabel>
        <OutlinedInput
          id="password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={
            lang == "en" ? en.signIn.enterPassword : ar.signIn.enterPassword
          }
          error={!!passwordError}
          sx={{
            borderRadius: "8px",
          }}
        />
        {passwordError && (
          <Typography variant="caption" color="error" sx={{ mt: 1 }}>
            {passwordError}
          </Typography>
        )}
      </FormControl>

      {/* Remember Me Checkbox */}
      <FormControlLabel
        control={
          <Checkbox
            required
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            sx={{
              "&.Mui-checked": {
                color: "#E8A710",
              },
            }}
          />
        }
        label={lang == "en" ? en.signIn.rememberMe : ar.signIn.rememberMe}
        sx={{ mb: 3, alignSelf: "flex-start", color: "#656567" }}
      />

      {/* Login Button */}
      <Button
        className="signInFormButton"
        variant="contained"
        onClick={handleLogin}
        sx={{ mb: 2 }}
      >
        {lang == "en" ? en.signIn.login : ar.signIn.login}
      </Button>

      {/* "Don’t have an account? Sign Up" Section */}
      <Typography align="center" variant="body2" sx={{ mt: 2 }}>
        {lang == "en" ? en.signIn.dontHaveAccount : ar.signIn.dontHaveAccount}{" "}
        <Typography
          component="span"
          onClick={handleSignUpClick}
          sx={{
            color: "black",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {lang == "en" ? en.signIn.signUp : ar.signIn.signUp}{" "}
          <ArrowOutwardIcon fontSize="small" />
        </Typography>
      </Typography>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
