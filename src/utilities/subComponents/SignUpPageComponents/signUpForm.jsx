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
import { useNavigate } from "react-router-dom";
import "./componentsStyle/signUpForm.css";

export default function SignUpForm() {
  const theme = useSelector((state) => state.themeReducer);
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // Validate full name using regex
  const validateFullName = (fullName) => {
    const regex = /^[a-z0-9_-]{3,15}$/;
    return regex.test(fullName);
  };

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
  const handleSignUp = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate full name
    if (!validateFullName(fullName)) {
      setFullNameError(
        "Full Name must be 3-15 characters long and can only contain lowercase letters, numbers, underscores, or hyphens."
      );
      return;
    } else {
      setFullNameError("");
    }

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

    // If validation passes, proceed with sign-up
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);

    // Add your Firebase authentication logic here
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
        Sign Up
      </Typography>
      <Typography variant="body1" className="signUpFormSubTitle" gutterBottom>
        Create an account to unlock exclusive features.
      </Typography>

      {/* Full Name Field */}
      <Typography variant="body1" className="fieldText" gutterBottom>
        Full Name
      </Typography>
      <TextField
        fullWidth
        label="Enter your Name"
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
        Email
      </Typography>
      <TextField
        fullWidth
        label="Enter your Email"
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

      {/* Terms and Conditions Checkbox */}
      <FormControlLabel
        control={
          <Checkbox
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            sx={{
              "&.Mui-checked": {
                color: "#E8A710",
              },
            }}
          />
        }
        label="I agree with Terms of Use and Privacy Policy"
        sx={{ mb: 3, alignSelf: "flex-start", color: "#656567" }}
      />

      {/* Sign Up Button */}
      <Button
        className="signUpFormButton"
        variant="contained"
        onClick={handleSignUp}
        sx={{ mb: 2 }}
      >
        Sign Up
      </Button>

      {/* "Already have an account? Login" Section */}
      <Typography align="center" variant="body2" sx={{ mt: 2 }}>
        Already have an account?{" "}
        <Typography
          component="span"
          onClick={handleSignInClick}
          sx={{
            color: "black",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Login <ArrowOutwardIcon fontSize="small" />
        </Typography>
      </Typography>
    </Box>
  );
}
