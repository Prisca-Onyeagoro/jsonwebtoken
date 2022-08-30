import express from 'express';
import color from 'colors';
import Route from './Routers/UserRouters.js';
import connectDB from './Config/Database.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

//  server middlewares
app.use(cookieParser());
app.use(express.json());
app.use('/api', Route);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App is running on server PORT: ${PORT}`.red);
  connectDB();
});
