import { useContext, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { userContext } from '../Context/userContext';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const [error, setError] = useState(null)
  const { loadUser } = useContext(userContext);


  useEffect(() => {
    if(error !== null){
      setTimeout(() => {
        setError(null)
      }, 2000);
    }
  }, [error])
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let firstname = data.get("firstName");
    let lastname = data.get("lastName");
    let username = data.get("username");
    let password = data.get('password');
    let confirmpassword = data.get('confirmpassword');
    let email = data.get('email');
    let phnumber = data.get('phnumber');
    // Check if any required field is empty
    if (!firstname || !lastname || !username || !password || !confirmpassword || !email || !phnumber) {
      // Handle empty fields (show an error message, prevent submission, etc.)
      setError('Please fill in all required fields.');
      return;
    }


    // Check if passwords match
    if (password !== confirmpassword) {
      setError("password is not matched");
      return;
    }
    try {
      let res = await axios.post("http://localhost:3345/user/register", {
        "firstname": firstname,
        "lastname": lastname,
        "username": username,
        "password": password,
        "email": email,
        "phone": phnumber
      });
      if (res.data?.token) {
        localStorage.setItem('token', res.data.token)
        loadUser();
      }
    } catch (err) {
      if(err.response.data.name && err.response.data.name == "err msg"){
        setError(err.response.data.msg );
      }
    }

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="lastName"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="confirm password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="confirm-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phnumber"
                  label="Phone Number"
                  name="phnumber"
                  autoComplete="phnumber"
                />
              </Grid>
            </Grid>
            {error ? <div className="alert alert-danger mt-2 mb-0" role="alert" id="errorMessage">
              {error}
            </div> : ''}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt:2, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}