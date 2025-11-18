
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import { db } from './db.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
