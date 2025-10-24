import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;



// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'Chati CMS Backend is running!'
  });
});


app.listen(port, () => {
  console.log(`The Server is runing :: http://localhost:${port}`);
});

export default app;