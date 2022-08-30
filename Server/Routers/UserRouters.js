import express, { Router } from 'express';
import {
  getUsers,
  Createusers,
  Loginusers,
  Verifytoken,
  Logout,
} from '../Controllers/Userscontrollers.js';

const Route = express.Router();

Route.post('/signup', Createusers);
Route.post('/login', Loginusers);
Route.get('/user', Verifytoken, getUsers);
Route.post('/logout', Verifytoken, Logout);

export default Route;
