import express, {Request, Response} from 'express'
import {PrismaClient} from '@prisma/client'
// const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded())
app.use(express.static('public'))
app.set('view engine','ejs')
app.set('views',__dirname+'/views')

const prisma = new PrismaClient();

app.get('/profile/:id',async (req:Request,res: Response) => {
    const id = req.params.id
    const pet = await prisma.user.findUnique({
        where:{
            id:Number(id)
        }
    })
    res.render('sum-info',{data:pet,mess:'Pet Profile'})
})

app.get("/pet-list", async (req:Request,res: Response) => {
    const users = await prisma.user.findMany();
    // res.json(users);
    res.render('pet-list',{data:users});
})

app.get("/reg-form", async (req:Request,res: Response) => {
    const values = {
        name: '',
        breed: '',
        sex: ''
    }
    res.render('fill-form',{values:values,mess:'Pet Registration',action:'/submit-reg-form'});
})

app.get("/edit-form/:id", async (req:Request,res: Response) => {
    const id = req.params.id
    const pet = await prisma.user.findUnique({
        where:{
            id:Number(id)
        }
    })
    const values = {
        name: pet?.name,
        breed: pet?.breed,
        sex: pet?.sex
    }
    res.render('fill-form',{values:values,mess:'Edit Pet Profile',action:'/submit-edit-form/' + id});
})

app.get("/", async (req:Request,res: Response) => {
    res.render('home');
})

app.post("/submit-reg-form", async (req:Request,res: Response) => {
    const {name,breed,sex} = req.body;
    const user = await prisma.user.create({
        data:{
            name: name,
            breed: breed,
            sex: sex
        }
    })
    // res.json(user);
    res.render('sum-info',{data:user,mess:'Registered Successfully!'});
})

app.post("/submit-edit-form/:id", async (req:Request,res: Response) => {
    const id = req.params.id;
    const {name,breed,sex} = req.body;
    const updatedUser = await prisma.user.update({
        where: {
            id: Number(id)
        },
        data:{
            name: name,
            breed: breed,
            sex: sex
        }
    });
    res.render('sum-info',{data:updatedUser,mess:'Editted Successfully!'});
})


app.get('/delete/:id',async (req:Request,res: Response) => {
    const id = req.params.id
    const deletedPet = await prisma.user.delete({
        where:{
            id:Number(id)
        }
    })

    const pets = await prisma.user.findMany();
    res.render('pet-list',{data:pets});
})

// app.get("/byId/:id", async (req:Request,res: Response) => {
//     const id = req.params.id;
//     const user = await prisma.user.findUnique({
//         where:{
//             id:Number(id)
//         }
//     })
//     res.json(user);
// })



// app.put("/", async (req:Request,res: Response) => {
//     const {id,username} = req.body;
//     const updatedUser = await prisma.user.update({
//         where: {
//             id: id
//         },
//         data:{
//             username: username
//         }
//     });
//     res.json(updatedUser);
// })

// app.delete("/:id", async (req:Request,res: Response) => {
//     const id = req.params.id;
//     const deletedUser = await prisma.user.delete({
//         where:{
//             id: Number(id)
//         }
//     });
//     res.json(deletedUser);
// })

app.listen(port,() => {
    console.log(`App listening to port ${port}`)
});