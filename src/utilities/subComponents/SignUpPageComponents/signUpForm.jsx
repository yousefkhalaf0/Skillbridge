import React, { useState } from "react";
import { registerUser } from "../../firebase.js";
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
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./componentsStyle/signUpForm.css";
import en from "../../localization/en.js";
import ar from "../../localization/ar.js";

export default function SignUpForm() {
  const theme = useSelector((state) => state.themeReducer);
  const lang = useSelector((state) => state.languageReducer);
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const validateForm = () => {
    let isValid = true;

    if (!validateFullName(fullName)) {
      setFullNameError(
        lang == "en" ? en.signUp.invalidFullName : ar.signUp.invalidFullName
      );
      isValid = false;
    } else {
      setFullNameError("");
    }

    if (!validateEmail(email)) {
      setEmailError(
        lang == "en" ? en.signUp.invalidEmail : ar.signUp.invalidEmail
      );
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError(
        lang == "en" ? en.signUp.invalidPassword : ar.signUp.invalidPassword
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    const result = await registerUser(email, password, fullName, false);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate("/"), 1500);
    } else {
      setError(result.error);
    }
  };

  const handleAdminSignUp = async () => {
    if (!validateForm()) return;

    const result = await registerUser(email, password, fullName, true);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate("/"), 1500);
    } else {
      setError(result.error);
    }
  };

  const validateFullName = (fullName) => {
    const regex = /^[a-z0-9_-]{3,15}$/;
    return regex.test(fullName);
  };
  const validateEmail = (email) => {
    const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    return regex.test(email);
  };
  const validatePassword = (password) => {
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    return regex.test(password);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSignInClick = () => {
    console.log("Redirect to sign-in page or open sign-in modal");
    navigate("/signIn");
  };

  return (
    <Box
      className={`${theme}SignUpFormContainer`}
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        padding: "30px",
      }}
    >
      <Typography variant="h4" className="signUpFormTitle" gutterBottom>
        {lang == "en" ? en.signUp.signUpTitle : ar.signUp.signUpTitle}
      </Typography>
      <Typography variant="body1" className="signUpFormSubTitle" gutterBottom>
        {lang == "en" ? en.signUp.signUpSubtitle : ar.signUp.signUpSubtitle}
      </Typography>

      {/* Full Name Field */}
      <Typography variant="body1" className="fieldText" gutterBottom>
        {lang == "en" ? en.signUp.fullName : ar.signUp.fullName}
      </Typography>
      <TextField
        fullWidth
        label={lang == "en" ? en.signUp.enterFullName : ar.signUp.enterFullName}
        variant="outlined"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        error={!!fullNameError}
        helperText={fullNameError}
        sx={{
          mb: 3,
          borderRadius: "8px",
        }}
      />

      {/* Email Field */}
      <Typography variant="body1" className="fieldText" gutterBottom>
        {lang == "en" ? en.signUp.email : ar.signUp.email}
      </Typography>
      <TextField
        fullWidth
        label={lang == "en" ? en.signUp.enterEmail : ar.signUp.enterEmail}
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
        {lang == "en" ? en.signUp.password : ar.signUp.password}
      </Typography>
      <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
        <InputLabel htmlFor="password">
          {" "}
          {lang == "en" ? en.signUp.enterPassword : ar.signUp.enterPassword}
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
            lang == "en" ? en.signUp.enterPassword : ar.signUp.enterPassword
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

      {/* Terms and Conditions Checkbox */}
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
        label={
          lang == "en"
            ? en.signUp.termsAndConditions
            : ar.signUp.termsAndConditions
        }
        sx={{ mb: 3, alignSelf: "flex-start", color: "#656567" }}
      />

      {/* Sign Up Button */}
      <Button
        className="signUpFormButton"
        variant="contained"
        onClick={handleSignUp}
        sx={{ textTransform: "none" }}
      >
        {lang == "en" ? en.signUp.signUpButton : ar.signUp.signUpButton}
      </Button>

      {/* Separator with "OR" */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          my: 2,
        }}
      >
        <Box sx={{ flexGrow: 1, height: "1px", backgroundColor: "gray" }} />
        <Typography variant="body2" sx={{ mx: 2, color: "#656567" }}>
          {lang == "en" ? en.signUp.or : ar.signUp.or}
        </Typography>
        <Box sx={{ flexGrow: 1, height: "1px", backgroundColor: "gray" }} />
      </Box>

      {/* Sign Up as Admin Button */}
      <Button
        className="signUpFormAdminButton"
        variant="outlined"
        onClick={handleAdminSignUp}
        sx={{ mb: 2, textTransform: "none" }}
      >
        {lang == "en" ? en.signUp.signUpAsAdmin : ar.signUp.signUpAsAdmin}
      </Button>

      {/* "Already have an account? Login" Section */}
      <Typography align="center" variant="body2" sx={{ mt: 2 }}>
        {lang == "en"
          ? en.signUp.alreadyHaveAccount
          : ar.signUp.alreadyHaveAccount}{" "}
        <Typography
          component="span"
          onClick={handleSignInClick}
          sx={{
            color: "black",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {lang == "en" ? en.signUp.login : ar.signUp.login}{" "}
          <ArrowOutwardIcon fontSize="small" />
        </Typography>
      </Typography>

      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success">
          {lang == "en" ? en.signUp.successMessage : ar.signUp.successMessage}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
}
