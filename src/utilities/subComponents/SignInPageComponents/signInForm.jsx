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
import { useSelector } from "react-redux";
import "./componentsStyle/signInForm.css";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
  const theme = useSelector((state) => state.themeReducer);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // Validate email using regex
  const validateEmail = (email) => {
    const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    return regex.test(email);
  };

  // Validate password using regex
  const validatePassword = (password) => {
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    return regex.test(password);
  };

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate email
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    // Validate password
    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    } else {
      setPasswordError("");
    }

    // If validation passes, proceed with login
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);

    // Add your Firebase authentication logic here
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
        Login
      </Typography>
      <Typography variant="body1" className="signInFormSubTitle" gutterBottom>
        Welcome back! Please log in to access your account.
      </Typography>

      {/* Email Field */}
      <Typography variant="body1" className="fieldText" gutterBottom>
        Email
      </Typography>
      <TextField
        fullWidth
        label="Enter Your Email"
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
        Password
      </Typography>
      <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
        <InputLabel htmlFor="password">Enter your Password</InputLabel>
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
          label="Enter your Password"
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
        label="Remember me"
        sx={{ mb: 3, alignSelf: "flex-start", color: "#656567" }}
      />

      {/* Login Button */}
      <Button
        className="signInFormButton"
        variant="contained"
        onClick={handleLogin}
        sx={{ mb: 2 }}
      >
        Login
      </Button>

      {/* "Don’t have an account? Sign Up" Section */}
      <Typography align="center" variant="body2" sx={{ mt: 2 }}>
        Don’t have an account?{" "}
        <Typography
          component="span"
          onClick={handleSignUpClick}
          sx={{
            color: "black",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Sign Up <ArrowOutwardIcon fontSize="small" />
        </Typography>
      </Typography>
    </Box>
  );
}
