import {getRouter} from './src/services/handlers/get-handlers'
import { postRouter } from './src/services/handlers/post-handlers';
import express from 'express'

const port = 3000;
const app = express();

app.set('view engine','ejs')
app.set('views','src/views')

app.use(express.json());
app.use(express.urlencoded())

app.use('/',getRouter);
app.use('/',postRouter);

app.listen(port,() => {
    console.log(`App listening to port ${port}`)
});