import cors from 'cors';
import express from 'express';
import { router } from './routes'

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}))
app.use(express.json())

app.use(router)

app.listen(process.env.PORT || 3333, () => {
    console.log('HTTP server running');
})