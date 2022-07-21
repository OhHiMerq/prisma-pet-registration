import {deletePetById, editFormById, getProfileById, home, petList, regForm as getRegForm} from './services/handlers/get-handlers'
import {submitEditForm, submitRegForm } from './services/handlers/post-handlers';
import express from 'express'

const port = 3000;
const app = express();

app.set('view engine','ejs')
app.set('views','src/views')

app.use(express.json());
app.use(express.urlencoded())

app.get('/delete/:id',deletePetById)
app.get('/edit-form/:id',editFormById)
app.get('/profile/:id',getProfileById)
app.get('/reg-form',getRegForm)
app.get('/pet-list',petList)
app.get('/',home)

app.post('/submit-reg-form',submitRegForm)
app.post('/submit-edit-form/:id',submitEditForm)


app.listen(port,() => {
    console.log(`App listening to port ${port}`)
});