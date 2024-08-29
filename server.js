import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
dotenv.config();
import { apiHelper } from './src/api/apiHelper.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: true}));

apiHelper(app)

app.listen(process.env.PORT, (error) => {
    if(error) {
        console.log("Server is not running..");
    } else {
        console.log(`Server is running on port ${process.env.PORT} 🖥️⌨️`)
    }
})