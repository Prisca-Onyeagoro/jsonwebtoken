import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../Store';

const Login = () => {
  const dispatch = useDispatch();

  const Navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  //   send an http request to the backend for using axios
  const sendRequest = async () => {
    const res = await axios
      .post('http://localhost:4000/api/login', {
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));
    const data = res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //   send an http request to the backend for using axios
    sendRequest()
      .then(() => dispatch(authActions.login()))
      .then(() => Navigate('/user'));
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          marginLeft="auto"
          marginRight="auto"
          width={300}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4">Log in</Typography>

          <TextField
            name="email"
            margin="normal"
            id="filled-basic"
            label="E-mail"
            variant="filled"
            type="email"
            value={inputs.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            margin="normal "
            id="filled-basic"
            label="Password"
            variant="filled"
            type="password"
            value={inputs.password}
            onChange={handleChange}
          />
          <Button sx={{ marginTop: '20px' }} type="submit" variant="contained">
            Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
