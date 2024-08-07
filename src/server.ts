import express, {Application, Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/routes';
import {connectDB} from './utility/db';

dotenv.config();
const corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
const app: Application = express();
const port = process.env.PORT || 8000;
app.use(express.json({limit: '50mb'}));
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use('/image', express.static('image'));
app.use('/api', router);

connectDB();

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error occurred:', err);
    return res.status(500).json({error: 'Internal Server Error'});
});

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'welcome to portfolio backend!!!'
    });
});

app.listen(port, () => {
    console.log(`Server is running at port ${port} and at url http://localhost:${port}`);
});
