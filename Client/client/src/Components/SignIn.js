import * as React from "react";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Grid,
  Snackbar,
  Alert as MuiAlert,
  Link as MaterialLink,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signinSchema } from "../Schema";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import axios from "axios";
import auth from "../auth";

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
      <MaterialLink component={RouterLink} color="inherit" to="/user/home">
        Social Media Marketplace
      </MaterialLink>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide(props) {
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
    control,
    reset,
  } = useForm({
    resolver: yupResolver(signinSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:8000/user/login", data);
      if (!res.data.error) {
        auth.login(res.data.user, () => {
          history.push("/user/home");
        });
      } else {
        handleOpen(res.data);
        auth.logout(() => {
          history.push("/login");
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: "100vh" }}>
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
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: 1 }}
              >
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
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={errors.password}
                        helperText={
                          errors.password ? errors.password.message : null
                        }
                      />
                    );
                  }}
                />

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <MaterialLink component={RouterLink} to="/" variant="body2">
                      Forgot password?
                    </MaterialLink>
                  </Grid>
                  <Grid item>
                    <MaterialLink
                      component={RouterLink}
                      to="/signup"
                      variant="body2"
                    >
                      {"Don't have an account? Sign Up"}
                    </MaterialLink>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
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
