import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
axios.defaults.withCredentials = true;

const Home = () => {
  const [user, setUser] = useState();

  const sendRequest = async () => {
    const res = await axios
      .get('http://localhost:4000/api/user', {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);
  return <>{user && <h1>{user.name}</h1>}</>;
};

export default Home;
