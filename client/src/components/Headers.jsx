import React, { useState } from 'react';
import { AppBar, Box, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { authActions } from '../Store';
axios.defaults.withCredentials = true;

const Headers = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const sendLogoutRequest = async () => {
    const res = await axios.post('http://localhost:4000/api/logout', null, {
      withCredentials: true,
    });
    if (res.status === 200) {
      return res;
    }
    return new Error('unable To Logout');
  };
  const handleLogout = () => {
    sendLogoutRequest().then(() => dispatch(authActions.logout()));
  };
  const [value, setValue] = useState();
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h3">LOGO</Typography>
          <Box sx={{ marginLeft: 'auto' }}>
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, value) => setValue(value)}
              indicatorColor="secondary"
            >
              {!isLoggedIn && (
                <>
                  <Tab to="/login" label="Login" LinkComponent={Link} />
                  <Tab to="/register" label="Signup" LinkComponent={Link} />
                </>
              )}
              {isLoggedIn && (
                <Tab
                  onClick={handleLogout}
                  to="/"
                  label="Log out"
                  LinkComponent={Link}
                />
              )}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Headers;
