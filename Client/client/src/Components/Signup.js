import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link as ReactRouterDOMLink, useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormHelperText } from "@mui/material";
import { signupSchema } from "../Schema";
import {
  Link as MaterialUILink,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <MaterialUILink
        component={ReactRouterDOMLink}
        color="inherit"
        to="/user/home"
      >
        Social Media Marketplace
      </MaterialUILink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const history = useHistory();
  const [error, setError] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleOpen = (e) => {
    setError({ message: e.message });
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(null);
    setOpen(false);
  };
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:8000/user/register", data);
      if (res.data.error) {
        console.log(res.data);
        handleOpen(res.data);
      } else {
        console.log(res.data.user);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [value, setValue] = React.useState({
    cpassword: "",
    password: "",
    showPassword: false,
  });
  const [val, setVal] = React.useState("consumer");

  const handleChangeVal = (event) => {
    setVal(event.target.value);
  };
  const handleChange = (prop) => (event) => {
    setValue({ ...value, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValue({
      ...value,
      showPassword: !value.showPassword,
    });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" maxWidth="xs">
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: "url(/images/5143312.jpg)",
              backgroundRepeat: "no-repeat",
              objectFit: "cover",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextField
                            autoComplete="fname"
                            name="firstName"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            size="small"
                            {...field}
                            error={errors.firstName}
                            helperText={
                              errors.firstName ? errors.firstName.message : null
                            }
                          />
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextField
                            autoComplete="lname"
                            name="lastName"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            autoFocus
                            size="small"
                            {...field}
                            error={errors.lastName}
                            helperText={
                              errors.lastName ? errors.lastName.message : null
                            }
                          />
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextField
                            autoComplete="email"
                            name="email"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoFocus
                            size="small"
                            {...field}
                            error={errors.email}
                            helperText={
                              errors.email ? errors.email.message : null
                            }
                          />
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="username"
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextField
                            autoComplete="uname"
                            name="username"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            autoFocus
                            size="small"
                            {...field}
                            error={errors.username}
                            helperText={
                              errors.username ? errors.username.message : null
                            }
                          />
                        );
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => {
                        return (
                          <FormControl fullWidth variant="outlined">
                            <InputLabel
                              error={errors.password}
                              htmlFor="outlined-adornment-password"
                            >
                              Password
                            </InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-password"
                              type={value.showPassword ? "text" : "password"}
                              value={value.password}
                              onChange={handleChange("password")}
                              required
                              size="small"
                              name="password"
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                  >
                                    {value.showPassword ? (
                                      <VisibilityOff />
                                    ) : (
                                      <Visibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                              label="Password"
                              {...field}
                              error={errors.password}
                            />
                            {errors.password && (
                              <FormHelperText error id="password-error">
                                {errors.password.message}
                              </FormHelperText>
                            )}
                          </FormControl>
                        );
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => {
                        return (
                          <TextField
                            autoComplete="phone"
                            name="phone"
                            inputProps={{ inputMode: "numeric" }}
                            required
                            fullWidth
                            id="phone"
                            label="Phone Number"
                            autoFocus
                            size="small"
                            {...field}
                            error={errors.phone}
                            helperText={
                              errors.phone ? errors.phone.message : null
                            }
                          />
                        );
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="userType"
                      control={control}
                      render={({ field }) => {
                        return (
                          <FormControl component="fieldset" {...field}>
                            <FormLabel component="legend">
                              Account Type
                            </FormLabel>
                            <RadioGroup
                              size="small"
                              aria-label="account-type"
                              name="account-type"
                              value={val}
                              onChange={handleChangeVal}
                              style={{ display: "initial", margin: "0 5px" }}
                            >
                              <FormControlLabel
                                value="consumer"
                                control={<Radio />}
                                label="Consumer"
                              />
                              <FormControlLabel
                                value="producer"
                                control={<Radio />}
                                label="Producer"
                              />
                            </RadioGroup>
                          </FormControl>
                        );
                      }}
                    />
                    {val === "producer" && (
                      <Controller
                        name="address"
                        control={control}
                        render={({ field }) => {
                          return (
                            <TextField
                              id="outlined-multiline-static"
                              label="Address"
                              multiline
                              rows={3}
                              placeholder="Enter your Address"
                              fullWidth
                              size="small"
                              {...field}
                            />
                          );
                        }}
                      />
                    )}
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <MaterialUILink
                      to="/login"
                      component={ReactRouterDOMLink}
                      variant="body2"
                    >
                      Already have an account? Sign in
                    </MaterialUILink>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5, mb: 4 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error && error.message}
        </Alert>
      </Snackbar>
    </>
  );
}
